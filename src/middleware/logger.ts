import { MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { Logger } from "typeorm";
/*
export class LogAccess implements MiddlewareInterface<TContext> {
    constructor(private readonly logger: Logger) {}
  
    async use({ context, info }: ResolverData<TContext>, next: NextFn) {
      const username: string = context.username || "guest";
      this.logger.log(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
      return next();
    }
  }*/