import { articleType } from "./schemaTypes/articleType";
import { categoryType } from "./schemaTypes/categoryType";
import { upcomingEventType } from "./schemaTypes/upcomingEventType";


export const schema = {
  types: [articleType, categoryType, upcomingEventType],
}
