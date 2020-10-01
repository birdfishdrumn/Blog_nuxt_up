<template>
  <div>
    <header>
      <Navbar></Navbar>
    </header>

    <div class="font-main flex flex-wrap justify-around">
      <main class="w-full mt-10 px-0">
        <nuxt />
      </main>
      <aside>
        <div class="w-64 mt-24 relative">
          <div>
            <div
              class="bg-center bg-cover w-16 h-16 mr-2 rounded-full shadow photo"
            ></div>
            <div>
              <h1 class="font-bold">Michi</h1>
              <p class="text-xs text-justify">
                普段は江戸風鈴のデザインを行なっている、michiと言います。
                日本人が歴史上関わりの深い動物などをイラストを交えて面白く深く紹介していきたいと思いますのでよろしくお願いいたします。
              </p>
            </div>
          </div>
          <div class="flex justify-around mt-5 text-xs">
            <nuxt-link to="/">
              <button>
                <fa-layers full-width class="fa-2x block mx-auto mb-1">
                  <fa :icon="faCode" />
                </fa-layers>
                Works
              </button>
            </nuxt-link>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <button>
                <fa-layers full-width class="fa-2x block mx-auto mb-1">
                  <fa :icon="faTwitter" />
                </fa-layers>
                Twitter
              </button>
            </a>
            <a
              href="https://github.com/si-zerodarkthirty"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <fa-layers full-width class="fa-2x block mx-auto mb-1">
                  <fa :icon="faGithub" />
                </fa-layers>
                GitHub
              </button>
            </a>
          </div>
          <div><Sidebar></Sidebar></div>
          <div><SidebarCat></SidebarCat></div>
        </div>
      </aside>
    </div>
    <div><TagFooter></TagFooter></div>
    <div><Footer></Footer></div>
  </div>
</template>

<script>
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default {
  computed: {
    faTwitter() {
      return faTwitter;
    },
    faGithub() {
      return faGithub;
    },
    faCode() {
      return faCode;
    },
  },
};
</script>

<style>
main {
  max-width: 700px;
}
.photo {
  margin: 0 auto 20px;
  min-width: 10rem;
  min-height: 10rem;
  background-image: url("../assets/images/IMG_0280.PNG");
}
button:focus {
  outline: none;
}
@media (max-width: 959px) {
  .aside-content {
    width: 100%;
  }
}

/* .aside-content {
  width: 40%;
} */
</style>
