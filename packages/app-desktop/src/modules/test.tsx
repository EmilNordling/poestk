abstract class View {
  constructor(...children: View[]) {
    console.log(children);
  }

  abstract body(): View | null;
}

class X extends View {
  public body(): View | null {
    return null;
  }
}

class E extends View {
  public body(): View {
    // prettier-ignore
    return (
      new X(
        new X(),
        new X(),
        new X(
          new X(),
          new X(),
          new X(),
        ),
      )
    );
  }
}
