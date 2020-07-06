

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserMutation
// ====================================================

export interface UserMutation_addUser {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface UserMutation {
  addUser: UserMutation_addUser | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: OrderMutation
// ====================================================

export interface OrderMutation_addOrder {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface OrderMutation_updateOrder {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface OrderMutation {
  addOrder: OrderMutation_addOrder | null;
  updateOrder: OrderMutation_updateOrder | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RuleMutation
// ====================================================

export interface RuleMutation_addRule {
  id: string;
  title: string;
}

export interface RuleMutation {
  addRule: RuleMutation_addRule | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserTypeMutation
// ====================================================

export interface UserTypeMutation_addUserType {
  id: string;
  title: string;
}

export interface UserTypeMutation {
  addUserType: UserTypeMutation_addUserType | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UserTypeRuleMutation
// ====================================================

export interface UserTypeRuleMutation_addUserTypeRule {
  id: string;
  ruleId: string;
  userTypeId: string;
}

export interface UserTypeRuleMutation_deleteUserTypeRule {
  id: string;
  ruleId: string;
  userTypeId: string;
}

export interface UserTypeRuleMutation {
  addUserTypeRule: UserTypeRuleMutation_addUserTypeRule | null;
  deleteUserTypeRule: UserTypeRuleMutation_deleteUserTypeRule | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_users {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface User_user {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface User_userByEmail {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface User {
  users: (User_users | null)[] | null;
  user: User_user | null;
  userByEmail: User_userByEmail | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Order
// ====================================================

export interface Order_orders {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface Order_order {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface Order_orderByUser {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface Order {
  orders: (Order_orders | null)[] | null;
  order: Order_order | null;
  orderByUser: Order_orderByUser | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderType
// ====================================================

export interface OrderType_orderTypes {
  id: string;
  title: string;
}

export interface OrderType_orderType {
  id: string;
  title: string;
}

export interface OrderType {
  orderTypes: (OrderType_orderTypes | null)[] | null;
  orderType: OrderType_orderType | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserType
// ====================================================

export interface UserType_userTypes {
  id: string;
  title: string;
}

export interface UserType {
  userTypes: (UserType_userTypes | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OrderStatus
// ====================================================

export interface OrderStatus_orderStatuses {
  id: string;
  title: string;
}

export interface OrderStatus_orderStatus {
  id: string;
  title: string;
}

export interface OrderStatus {
  orderStatuses: (OrderStatus_orderStatuses | null)[] | null;
  orderStatus: OrderStatus_orderStatus | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Rule
// ====================================================

export interface Rule_rules {
  id: string;
  title: string;
}

export interface Rule {
  rules: (Rule_rules | null)[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserTypeRule
// ====================================================

export interface UserTypeRule_userTypeRules {
  ruleId: string;
  id: string;
  userTypeId: string;
}

export interface UserTypeRule {
  userTypeRules: (UserTypeRule_userTypeRules | null)[] | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================