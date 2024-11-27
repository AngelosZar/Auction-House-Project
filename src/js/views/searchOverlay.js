export const searchOverlay = async function () {
  const ParentContainer = document.querySelector('main');
  const searchOverlay = document.createElement('section');
  const searchBtn = document.querySelector('#searchBtn');
  //   console.log(searchBtn);
  searchOverlay.classList.add(
    'relative',
    'bg-light-component',
    'dark:bg-purple-dark',
    'border-y-2',
    'dark:border-none',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'h-lvh',
    'w-full'
  );
  const searchOverlayContent = `
          <div class="flex justify-center items-center py-16">
          <div class="max-w-md">
            <img src="./media/header_logos/grayscale-transparent.png" alt="" srcset="" />
            <h1 class="text-4xl font-extrabold text-center mt-4">
              Search for treasures
          </div>
        </div>
        <div class="w-full max-w-2xl px-8">
          <form action="" class="flex flex-col items-center  w-full ">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for items"
              class="input-forms"
            />
            <button class="btn btn-primary dark:btn-primary-dark mt-4 mb-[50%]">Search</button>
          </form>
        </div>
  `;

  //   console.log('i am a search overlay');
};
// <!-- <section
//         class="relative bg-light-component dark:bg-purple-dark border-y-2 dark:border-none flex flex-col justify-center items-center h-lvh"
//         id="searchContainer"
//       >
// <div class="flex justify-center items-center py-16">
//   <div class="max-w-md">
//     <img src="./media/header_logos/grayscale-transparent.png" alt="" srcset="" />
//     <h1 class="text-4xl font-extrabold text-center mt-4">
//       Search for treasures
//   </div>
// </div>
// <div class="w-full max-w-2xl px-8">
//   <form action="" class="flex flex-col items-center  w-full ">
//     <input
//       type="text"
//       name="search"
//       id="search"
//       placeholder="Search for items"
//       class="input-forms"
//     />
//     <button class="btn btn-primary dark:btn-primary-dark mt-4 mb-[50%]">Search</button>
//   </form>
// </div>
//       </section> -->
