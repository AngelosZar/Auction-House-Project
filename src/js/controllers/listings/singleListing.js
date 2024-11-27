import { list } from 'postcss';
import { initTabComponent } from '../../utilities/initTabComponent';

function main() {
  console.log('halo from the other side');
  console.log('i am the controller one more time');
  initTabComponent();
}
document.addEventListener('DOMContentLoaded', main());
