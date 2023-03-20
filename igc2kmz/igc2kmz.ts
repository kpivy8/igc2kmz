
import IGCParser = require("igc-parser")
import { FlightConvert, I2KConfiguration, defaultconfig } from "./init";
import { Flight } from "./flight";
import { Track } from "./track";
import { Task } from "./task";
import { SimpleCanvas } from "./simplecanvas";
import { Photo } from "./photo";

export function igc2kmz(cv: SimpleCanvas, igccontents: string[] | string, infilenames?: string[] | string, taskcontent?: string, photos?: [string, Buffer][], options: I2KConfiguration = defaultconfig): Promise<ArrayBuffer> {
  let config: I2KConfiguration = { ...defaultconfig, ...options };
  igccontents = Array.isArray(igccontents) ? igccontents : [igccontents ?? ''];
  infilenames = Array.isArray(infilenames) ? infilenames : [infilenames ?? ''];
  if (infilenames.length < igccontents.length) {
    for (let i = infilenames.length; i < igccontents.length; i++) {
      infilenames.push(`track${i + 1}.igc`);
    }
  }
  let flights: Flight[] = [];
  let firstlaunch = -1;
  for (let i = 0; i < igccontents.length; i++) {
    let igc = IGCParser.parse(igccontents[i], { lenient: true });
    if (options.same_start && igc.fixes.length > 0) {
      if (firstlaunch < 0) {
        firstlaunch = igc.fixes[0].timestamp;
      } else {
        let offset = firstlaunch - igc.fixes[0].timestamp;
        igc.fixes.forEach(f => f.timestamp += offset);
      }
    }
    flights.push(new Flight(new Track(igc, infilenames[i])));
  }
  //console.log(flight);
  let task: Task | null = null;
  if (taskcontent) {
    task = Task.loadTask(taskcontent);
  }
  let promises: Promise<Photo>[] = [];
  if (flights.length > 0 && photos) {
    photos.forEach(photo => {
      promises.push(Photo.parse(photo[0], photo[1]));
    });
  }
  return new Promise<ArrayBuffer>(res => {
    Promise.all(promises).then(photos => {
      if (flights.length > 0 && photos.length > 0) {
        flights[flights.length - 1].photos.push(...photos);
      }
      let fcv = new FlightConvert(cv);
      // TODO root KML
      fcv.flights2kmz(flights, config, task).then(res);
    });
  });
}
