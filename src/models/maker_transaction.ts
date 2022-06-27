import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { transaction, transactionId } from './transaction';

export interface maker_transactionAttributes {
  id: number;
  transcationId?: string;
  inId?: number;
  outId?: number;
  fromChain?: number;
  toChain?: number;
  toAmount?: string;
  replySender?: string;
  replyAccount?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type maker_transactionPk = "id";
export type maker_transactionId = maker_transaction[maker_transactionPk];
export type maker_transactionOptionalAttributes = "id" | "transcationId" | "inId" | "outId" | "fromChain" | "toChain" | "toAmount" | "replySender" | "replyAccount" | "createdAt" | "updatedAt";
export type maker_transactionCreationAttributes = Optional<maker_transactionAttributes, maker_transactionOptionalAttributes>;

export class maker_transaction extends Model<maker_transactionAttributes, maker_transactionCreationAttributes> implements maker_transactionAttributes {
  id!: number;
  transcationId?: string;
  inId?: number;
  outId?: number;
  fromChain?: number;
  toChain?: number;
  toAmount?: string;
  replySender?: string;
  replyAccount?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // maker_transaction belongsTo transaction via inId
  in!: transaction;
  getIn!: Sequelize.BelongsToGetAssociationMixin<transaction>;
  setIn!: Sequelize.BelongsToSetAssociationMixin<transaction, transactionId>;
  createIn!: Sequelize.BelongsToCreateAssociationMixin<transaction>;
  // maker_transaction belongsTo transaction via outId
  out!: transaction;
  getOut!: Sequelize.BelongsToGetAssociationMixin<transaction>;
  setOut!: Sequelize.BelongsToSetAssociationMixin<transaction, transactionId>;
  createOut!: Sequelize.BelongsToCreateAssociationMixin<transaction>;

  static initModel(sequelize: Sequelize.Sequelize): typeof maker_transaction {
    return maker_transaction.init({
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "ID"
    },
    transcationId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "transcationId",
      unique: "trxid"
    },
    inId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "inId",
      references: {
        model: 'transaction',
        key: 'id'
      },
      unique: "maker_transaction_ibfk_1"
    },
    outId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "outId",
      references: {
        model: 'transaction',
        key: 'id'
      },
      unique: "maker_transaction_ibfk_2"
    },
    fromChain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "from Chain"
    },
    toChain: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "to Chain"
    },
    toAmount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "toAmount"
    },
    replySender: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "maker Sender Address"
    },
    replyAccount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "reply user Recipient"
    }
  }, {
    sequelize,
    tableName: 'maker_transaction',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "trxid",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "transcationId" },
        ]
      },
      {
        name: "outId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "outId" },
        ]
      },
      {
        name: "inId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "inId" },
        ]
      },
    ]
  });
  }
}
