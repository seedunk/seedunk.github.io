<script setup>
import DefaultTheme, { VPHomeHero } from 'themekit-js/theme'
import { useData } from 'themekit-js'    
const { site, frontmatter,localeIndex } = useData()
const { Layout } = DefaultTheme
</script> 
<template> 
  <Layout>
      <template #sidebar-nav-after >     </template> 
      <template #aside-top> 
          <div class="sd-links">
              <a href="https://github.com/seedunk/?class=btn%20alt" class="btn alt" target="_blank" rel="noreferrer"><img src="/Resources/icon/github.h-18.svg?class=icon" alt="" class="icon">Seedunk</a>
          </div>
      </template>
      <template #aside-bottom> 
          asdasdsad
      </template>
  </Layout> 
</template> 
<style scoped>  
    .sd-links{
        margin-bottom: 24px;
    }
</style>