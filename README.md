SELIG_PhET_Intern
=====

## <a name="BarMagnet-randomizePos"></a> BarMagnet#randomizePos([width, height, withRotate])
Randomly sets `BarMagnet.location` to be within `\u00B1width/2` and `\u00B1height/2`.
Additionally, `if (withRotate == true)`, randomly sets `BarMagnet.orientation`.

=====

### Addressed in review:
> <a name="comment-dupeConst"></a> Duplicated constants
PhET simulations seem to work with these static bounds, and then are scaled by the view appropriately. I added optional parameters so that when I understand how to reference the `ExampleScreenView` dimensions from the `ControlPanel` view in the correct way, I can go back and pass them in instead of deferring to literals.

> Debug statements left in code
Heh... oops!

> MVC callchain antipattern
[randomizePos](#BarMagnet-randomizePos) is a method that should belong to the `BarModel` instance, and now it does appropriately. This method is called from the `ControlPanelt` view, which is passed a reference to the model.

> Unmaintainable parent node access
Expanding on my explanation for "[duplicated constraints](#comment-dupeConst)", I know that the correct way to define the bounds for [randomizePos](#BarMagnet-randomizePos) is to access them from root-parent `ExampleScreenView`.

> Moving a magnet can occasionally change bar size
This is associated with part 2.

> Modularizing commits
I will address each button with actions for one commit.
