Vue.component('filtercomp', {
  data () {
      return {
        search: ''
      }
    },
    template: 
    `
    <form action="#" class="search-form"  @submit.prevent='$parent.filter(search)'>
      <input type="text" class="search-field" v-model='search'>
      <button type="submit" class="btn-search">
          <i class="fas fa-search"></i>
      </button>
    </form>
    `
})

