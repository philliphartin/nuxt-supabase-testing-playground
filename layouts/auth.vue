<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a class="flex items-center mb-12 text-2xl font-semibold text-gray-900 dark:text-white" href="#">
        <img class="w-12 h-12 mr-2" src="/labs.png" alt="logo" />
        <div>
          Airlume
          <p class="-mt-1 text-xs text-gray-300 font-mono">Labs</p>
        </div>
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <slot></slot>
        </div>
      </div>
    </div>
  </section>
</template>
