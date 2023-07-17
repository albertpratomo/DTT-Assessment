<template>
  <div class="page-content">
    <div class="section-about-1">
      <h1 class="header-1">About DTT Real Estate</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium et
        cum delectus itaque obcaecati consequuntur culpa ducimus, quaerat nulla
        esse ullam voluptatibus! At vitae quaerat sit incidunt, maxime voluptas
        totam sequi, adipisci, molestiae modi deserunt sapiente magni ducimus et
        sint illum perferendis blanditiis error velit! Eligendi esse itaque
        veniam nesciunt numquam saepe distinctio quasi magnam enim, accusamus
        nobis ipsum aliquid iste! Reiciendis, dolorem? Amet temporibus hic
        tenetur ipsa maxime?
      </p>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium et
        cum delectus itaque obcaecati consequuntur culpa ducimus, quaerat nulla
        esse ullam voluptatibus!
      </p>
    </div>
    <div class="section-about-2">
      <h1 class="header-1">Design & Development</h1>
      <div class="content-about-2">
        <img src="@/assets/image/img_logo_dtt@3x.png" alt="" />
        <div class="col-about-2">
          <p>By DTT</p>
          <a href="www.d-tt.nl">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "@/styles/pages.scss";
.section-about-1,
.section-about-2 {
  text-align: left;
}
.section-about-1 {
  margin-top: 1.5em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
.section-about-2 {
  padding-bottom: 0.5em;
}
.section-about-2 img {
  align-self: center;
}
.section-about-1 p {
  font-family: $secondary-font;
  color: $secondary-text-color;
  font-weight: 400;
  font-size: 18px;
}
.content-about-2 {
  display: flex;
  gap: 1em;
}
.section-about-2 .header-1 {
  margin-bottom: 1em;
}
.content-about-2 img {
  width: 20%;
}
.col-about-2 p {
  margin-bottom: 0.2em;
  color: $secondary-text-color;
}
</style>
