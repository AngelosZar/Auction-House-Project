import { updateProfileApiCall } from '../../model/profile/update';
import { collectProfileChanges } from '../../views/profile/updateProfile';
import { testData } from '../../model/profile/update';

const updateProfileHandler = async function (data) {
  await updateProfileApiCall('kimYong', testData);
  //   await collectProfileChanges(data);
  console.log('i do the update');
};
// updateProfileHandler();
