const { gql } = require('apollo-server-core');

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    surname: String!
    phoneNumber: String!
    email: String!
    password: String!
    createdAt: String!
    typeId: String!
  }

  type Order {
    id: ID!
    userId: String!
    typeId: String!
    description: String!
    statusId: String!
    managerId: String
  }

  type UserTypeRule {
      id: ID!
      ruleId: String!
      userTypeId: String!
  }

  type InfoType {
      id: ID!
      title: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    userByEmail(email: String!): User

    userTypes: [InfoType]

    orders: [Order]
    order(id: String!): Order
    orderByUser(userId: String!): Order

    orderTypes: [InfoType]
    orderType(id: ID!): InfoType

    orderStatuses: [InfoType]
    orderStatus(id: ID!): InfoType

    rules: [InfoType]
    
    userTypeRules: [UserTypeRule]
  }

  type Mutation {

    addUser(
        name: String!,
        surname: String!,
        phoneNumber: String!,
        email: String!,
        password: String!,
        typeId: String!,
        createdAt: String!): User

    addOrder(
        userId: String!
        typeId: String!
        description: String!
        statusId: String!
        managerId: String): Order

    updateOrder(
        id: ID!
        userId: String!
        typeId: String!
        description: String!
        statusId: String!
        managerId: String): Order

    addRule(title: String!): InfoType
    
    addUserType(title: String!): InfoType

    addUserTypeRule(
      ruleId: String!, 
      userTypeId: String!): UserTypeRule
    deleteUserTypeRule(id: ID!): UserTypeRule
  }
`;

module.exports = typeDefs;