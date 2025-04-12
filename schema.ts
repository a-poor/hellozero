import {
  createSchema,
  definePermissions,
  Row,
  table,
  string,
  relationships,
  ANYONE_CAN_DO_ANYTHING,
  ANYONE_CAN,
} from "@rocicorp/zero";
import type { ExpressionBuilder, PermissionsConfig } from "@rocicorp/zero";
import type { AuthData } from "@/lib/auth";


const user = table("user")
  .columns({
    id: string(),
    name: string(),
  })
  .primaryKey("id");

const task = table("task")
  .columns({
    id: string(),
    name: string(),
    status: string(),
    createdById: string(),
    assignedToId: string(),
  })
  .primaryKey("id");

const taskRelationships = relationships(task, ({ one }) => ({
  createdBy: one({
    sourceField: ["createdById"],
    destSchema: user,
    destField: ["id"],
  }),
  assignedTo: one({
    sourceField: ["assignedToId"],
    destSchema: user,
    destField: ["id"],
  }),
}));

export const schema = createSchema({
  tables: [user, task],
  relationships: [taskRelationships],
});

export type Schema = typeof schema;
export type User = Row<typeof schema.tables.user>;
export type Task = Row<typeof schema.tables.task>;

type EB<T extends keyof Schema['tables']> = ExpressionBuilder<Schema, T>;

export const permissions = definePermissions<AuthData, Schema>(schema, () => {
  const isAdmin = (authData: AuthData, {cmpLit}: EB<'task'>) => 
    cmpLit(authData.admin, "IS", true);
  
  const isAuthenticated = (authData: AuthData, {cmpLit}: EB<'task'>) => 
    cmpLit(authData.sub, "IS NOT", null);
  
  const isCreator = (authData: AuthData, {cmp}: EB<'task'>) => 
    cmp('createdById', '=', authData.sub)
  
  const isAssignee = (authData: AuthData, {cmp}: EB<'task'>) => 
    cmp('assignedToId', '=', authData.sub);

  return {
    user: ANYONE_CAN_DO_ANYTHING,
    task: {
      row: {
        select: [
          isAuthenticated,
        ],
        insert: [
          isCreator,
          isAdmin,
        ],
        update: {
          preMutation: ANYONE_CAN,
          postMutation: [
            isAdmin,
            isCreator,
            isAssignee,
          ],
        },
        delete: [
          isAdmin,
        ],
      },
    },
  } satisfies PermissionsConfig<AuthData, Schema>;
});
