

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_users {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface UserQuery_user {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface UserQuery_userByEmail {
  id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  password: string;
  createdAt: string;
  typeId: string;
}

export interface UserQuery {
  users: (UserQuery_users | null)[] | null;
  user: UserQuery_user | null;
  userByEmail: UserQuery_userByEmail | null;
}


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
// GraphQL query operation: OrderQuery
// ====================================================

export interface OrderQuery_orders {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface OrderQuery_order {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface OrderQuery_orderByUser {
  id: string;
  userId: string;
  typeId: string;
  description: string;
  statusId: string;
  managerId: string | null;
}

export interface OrderQuery {
  orders: (OrderQuery_orders | null)[] | null;
  order: OrderQuery_order | null;
  orderByUser: OrderQuery_orderByUser | null;
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
// GraphQL query operation: OrderTypeQuery
// ====================================================

export interface OrderTypeQuery_orderTypes {
  id: string;
  title: string;
}

export interface OrderTypeQuery_orderType {
  id: string;
  title: string;
}

export interface OrderTypeQuery {
  orderTypes: (OrderTypeQuery_orderTypes | null)[] | null;
  orderType: OrderTypeQuery_orderType | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserTypeQuery
// ====================================================

export interface UserTypeQuery_userTypes {
  id: string;
  title: string;
}

export interface UserTypeQuery {
  userTypes: (UserTypeQuery_userTypes | null)[] | null;
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
// GraphQL query operation: OrderStatusQuery
// ====================================================

export interface OrderStatusQuery_orderStatuses {
  id: string;
  title: string;
}

export interface OrderStatusQuery_orderStatus {
  id: string;
  title: string;
}

export interface OrderStatusQuery {
  orderStatuses: (OrderStatusQuery_orderStatuses | null)[] | null;
  orderStatus: OrderStatusQuery_orderStatus | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RuleQuery
// ====================================================

export interface RuleQuery_rules {
  id: string;
  title: string;
}

export interface RuleQuery {
  rules: (RuleQuery_rules | null)[] | null;
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
// GraphQL query operation: UserTypeRuleQuery
// ====================================================

export interface UserTypeRuleQuery_userTypeRules {
  ruleId: string;
  id: string;
  userTypeId: string;
}

export interface UserTypeRuleQuery {
  userTypeRules: (UserTypeRuleQuery_userTypeRules | null)[] | null;
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

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================