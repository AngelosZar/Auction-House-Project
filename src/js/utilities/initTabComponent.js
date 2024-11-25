export const initTabComponent = function () {
  console.log('working yo');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  //   console.log(tabs);
  //   console.log(tabContents);
  //
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      //   console.log('clicked');
      //   console.log('Tab ID:', tab.id);
      const targetId = tab.id.replace('tab-', '');
      //   console.log('Target Id:', targetId);
      //
      tabContents.forEach((content) => {
        content.classList.add('hidden');
      });
      //
      tabs.forEach((tab) => {
        tab.classList.remove(
          'font-bold',
          'text-green-2',
          'dark:text-blue-400',
          'border-green-2',
          'dark:border-blue-400'
        );
        tab.classList.add('border-transparent');
      });

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.remove('hidden');
        tab.classList.add(
          'font-bold',
          'text-green-2',
          'dark:text-blue-400',
          'border-green-2',
          'dark:border-blue-400'
        );
        //   document.getElementById(targetId).classList.remove('hidden')
        tab.classList.remove('border-transparent', 'border-none');
      }
    });
  });
};
