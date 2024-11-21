import { readProfile } from '../../model/profile/read';
import { readProfiles } from '../../model/profile/read';

export async function readProfileHandler() {
  console.log('i am  handling the profile read request and data');
  //   await readProfile();
  await readProfiles();
}
