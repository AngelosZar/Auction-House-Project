import {
  readProfile,
  readProfiles,
  readProfileBids,
  readProfileListings,
  readProfileWins,
} from '../../model/profile/read';

export async function readProfileHandler() {
  console.log('i am  handling the profile read request and data');
  //   await readProfile();
  await readProfiles();
  //   await readProfile('zzz');
}
