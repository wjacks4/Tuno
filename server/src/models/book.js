module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING
  })
  return Book
}
