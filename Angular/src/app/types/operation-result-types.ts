

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCollection
// ====================================================

export interface GetUserCollection_users {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface GetUserCollection {
  users: (GetUserCollection_users | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface GetUser {
  user: GetUser_user | null;
}

export interface GetUserVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserByEmail
// ====================================================

export interface GetUserByEmail_userByEmail {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface GetUserByEmail {
  userByEmail: GetUserByEmail_userByEmail | null;
}

export interface GetUserByEmailVariables {
  email: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUser
// ====================================================

export interface AddUser_addUser {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface AddUser {
  addUser: AddUser_addUser | null;
}

export interface AddUserVariables {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  password: string;
  typeId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderCollection
// ====================================================

export interface GetOrderCollection_orders {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface GetOrderCollection {
  orders: (GetOrderCollection_orders | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrder
// ====================================================

export interface GetOrder_order {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface GetOrder {
  order: GetOrder_order | null;
}

export interface GetOrderVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderByUserId
// ====================================================

export interface GetOrderByUserId_orderByUser {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface GetOrderByUserId {
  orderByUser: GetOrderByUserId_orderByUser | null;
}

export interface GetOrderByUserIdVariables {
  userId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddOrder
// ====================================================

export interface AddOrder_addOrder {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface AddOrder {
  addOrder: AddOrder_addOrder | null;
}

export interface AddOrderVariables {
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateOrder
// ====================================================

export interface UpdateOrder_updateOrder {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface UpdateOrder {
  updateOrder: UpdateOrder_updateOrder | null;
}

export interface UpdateOrderVariables {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderTypeCollection
// ====================================================

export interface GetOrderTypeCollection_orderTypes {
  id: string;
  title: string;
}

export interface GetOrderTypeCollection {
  orderTypes: (GetOrderTypeCollection_orderTypes | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderType
// ====================================================

export interface GetOrderType_orderType {
  id: string;
  title: string;
}

export interface GetOrderType {
  orderType: GetOrderType_orderType | null;
}

export interface GetOrderTypeVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserTypeCollection
// ====================================================

export interface GetUserTypeCollection_userTypes {
  id: string;
  title: string;
}

export interface GetUserTypeCollection {
  userTypes: (GetUserTypeCollection_userTypes | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUserType
// ====================================================

export interface AddUserType_addUserType {
  id: string;
  title: string;
}

export interface AddUserType {
  addUserType: AddUserType_addUserType | null;
}

export interface AddUserTypeVariables {
  title: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderStatusCollection
// ====================================================

export interface GetOrderStatusCollection_orderStatuses {
  id: string;
  title: string;
}

export interface GetOrderStatusCollection {
  orderStatuses: (GetOrderStatusCollection_orderStatuses | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderStatus
// ====================================================

export interface GetOrderStatus_orderStatus {
  id: string;
  title: string;
}

export interface GetOrderStatus {
  orderStatus: GetOrderStatus_orderStatus | null;
}

export interface GetOrderStatusVariables {
  id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetRuleCollection
// ====================================================

export interface GetRuleCollection_rules {
  id: string;
  title: string;
}

export interface GetRuleCollection {
  rules: (GetRuleCollection_rules | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddRule
// ====================================================

export interface AddRule_addRule {
  id: string;
  title: string;
}

export interface AddRule {
  addRule: AddRule_addRule | null;
}

export interface AddRuleVariables {
  title: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserTypeRuleCollection
// ====================================================

export interface GetUserTypeRuleCollection_userTypeRules {
  ruleId: string;
  id: string;
  userTypeId: string;
}

export interface GetUserTypeRuleCollection {
  userTypeRules: (GetUserTypeRuleCollection_userTypeRules | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddUserTypeRule
// ====================================================

export interface AddUserTypeRule_addUserTypeRule {
  id: string;
  ruleId: string;
  userTypeId: string;
}

export interface AddUserTypeRule {
  addUserTypeRule: AddUserTypeRule_addUserTypeRule | null;
}

export interface AddUserTypeRuleVariables {
  ruleId: string;
  userTypeId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteUserTypeRule
// ====================================================

export interface DeleteUserTypeRule_deleteUserTypeRule {
  id: string;
  ruleId: string;
  userTypeId: string;
}

export interface DeleteUserTypeRule {
  deleteUserTypeRule: DeleteUserTypeRule_deleteUserTypeRule | null;
}

export interface DeleteUserTypeRuleVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================