# Circle Edge Clean architecture server

## Folder structure

- application - interfaces, implementation of the app, routers, controllers
- domain - models, business logic that don't depends on specific framework needs, entities, interfaces, services
- infrastructure - implementation of external resources, databases, external api calls,
- main - entry point of the app, configuration point, connection between layers
