module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'コンポーネントの名前(最初は大文字にする)',
    validate: str => /^[A-Z]/.test(str)
  },
  {
    type: 'input',
    name: 'category',
    message: 'コンポーネントの名前(最初は小文字にする)',
    validate: str => /^[a-z]/.test(str)
  },

]
