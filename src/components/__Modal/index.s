.modal
  position: absolute
  @include centerFlex()
  width: 100vw
  height: 100vh
  background: #0000005e
  &__box
    @include centerFlex()
    box-sizing: border-box
    flex-direction: column
    justify-content: space-between
    width: 300px
    height: 300px
    background: #fff
    border-radius: 25px
    padding: 30px 0
    &_title
      margin: 0
  &__footer
    @include centerFlex()
    flex-direction: column
    &_error
      color: $colorErorr
      font-size: 12px
      margin-top: 14px
