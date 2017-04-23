import { UPDATE_MAJOR, UPDATE_MINOR, UPDATE_PATCH } from '../constants/publishConstants';

export function getNextVersion(currentLabel, updateType) {
  const label = currentLabel === 'master' ? '0.0.0' : currentLabel;
  const currentSplit = label.split('.');
  let major = parseInt(currentSplit[0]);
  let minor = parseInt(currentSplit[1]);
  let patch = parseInt(currentSplit[2]);

  if (updateType === UPDATE_MAJOR) {
    major += 1;
    return `${major}.0.0`;
  } else if (updateType === UPDATE_MINOR) {
    minor += 1;
    return `${major}.${minor}.0`;
  } else if (updateType === UPDATE_PATCH) {
    patch += 1;
    return `${major}.${minor}.${patch}`;
  } else {
    throw new Error(`Invalid updateType: ${updateType}`);
  }
}
