action 1 -> modifier - | condition (while) - | context (for, with) 1

0 + length
attack skills deal #% increased damage with ailments while dual wielding - action = increased
+ action, reduces string to:
attack skills deal damage with ailments while dual wielding

span: 0 + new length -> Length
"attack skills" deal damage with ailments while dual wielding
+ condition

span: 14 + length
deal damage with ailments while dual wielding
no match, go to next word

span: 19 + length
"damage" with ailments while dual wielding
+ modifier

span: 26 + length;
"with ailments" while dual wielding
+ context

span: 40 + Length
"while dual wielding"
+ condition

AST state is now: Array<Spec>[action, condition, modifer, context, condition]
Break AST into
{
  SDModifierID: {
    context: 'ailments',
    condition: ['whileDualWielding', 'attackSkills'],
    modifier: {
      damage: {
        increased: VALUE,
      },
    },
  },
}
following condition -> context -> modifer -> action
return new object

#% increased cold damage
{
  SDModifierID: {
    context: 'cold',
    condition: null,
    modifier: {
      damage: {
        increased: VALUE,
      },
    },
  },
}

#% increased cast speed
{
  SDModifierID: {
    context: 'castSpeed',
    condition: null,
    modifier: {
      increased: VALUE,
    },
  },
}

#% increased projectile damage
{
  SDModifierID: {
    context: 'projectile',
    condition: null,
    modifier: {
      damage: {
        increased: VALUE,
      },
    },
  },
}
