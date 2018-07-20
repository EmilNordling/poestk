module.exports = function role (schema, options) {
  options = Object.assign(
    {
      roles: [],
      accessLevels: {},
      rolePath: 'role',
      rolesStaticPath: 'roles',
      accessLevelsStaticPath: 'accessLevels',
      hasAccessMethod: 'hasAccess',
      roleHasAccessMethod: 'roleHasAccess'
    },
    options,
  )

  schema.path(options.rolePath, String).path(options.rolePath).enum({ values: options.roles }).required(true);

  schema.static(options.rolesStaticPath, options.roles);
  schema.static(options.accessLevelsStaticPath, options.accessLevels);

  schema.method(options.hasAccessMethod, function (accessLevels) {
    const userRole = this.get(options.rolePath);

    return roleHasAccess(userRole, accessLevels);
  })

  schema.static(options.roleHasAccessMethod, roleHasAccess);

  function roleHasAccess (role, accessLevels) {
    if (typeof accessLevels === 'undefined') {
      return false;
    }

    accessLevels = [].concat(accessLevels);

    return !accessLevels.some(level => {
      const roles = options.accessLevels[level] || [];

      return roles.indexOf(role) === -1;
    })
  }
}
