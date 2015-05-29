module.exports = function(sequelize, DataTypes) {
  var Merchant = sequelize.define('Merchant', {
    PurchaseId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
      autoIncrement: true
    }
  }, {
    tableName: 'Merchant',
    timestamps: false
  }); 
  return Merchant;
};