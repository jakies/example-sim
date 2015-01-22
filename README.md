SELIG_PhET_Intern
=====
### Addressed in review:
> Memory leak in model array

Since the `ExampleModel` doesn't *need* to retain references to the additional `BarMagnet`s, I removed `ExampleModel.extraBars` and changed the `ExampleModel.events["addBar"]` to be called with `ExampleModel.events.trigger1( "addBar", BarMagnet )` so that the model travels with the event. When the lone reference to a `BarMagnetNode` is released from `ExampleScreenView.children`, the corresponding `BarMagnet` is garbage-collected with it.

> `unshift + elements[0]` and `slice(-2)` calls unmaintainable

The unshift and explicit element position access were resolved by removing the `ExampleModel.extraBars` array and passing the new `BarMagnet` with the `"addBar"` event explicitly. The `ExampleModelView.children = ExampleModelView.children.slice(-2)` issue was resolved by defining an array called `defaultElements` in the `ExampleModelView` constructor (though it is not tied to the instance so it isn't available after instantiation) which is used in the call `ExampleModelView.setChildren( defaultElements )` during construction and the `"resetViewChildren"` event callback.

> <a name="comment-dupeConst"></a> Duplicated constants

PhET simulations seem to work with these static bounds, and then are scaled by the view appropriately. I added optional parameters so that when I understand how to reference the `ExampleScreenView` dimensions from the `ControlPanel` view in the correct way, I can go back and pass them in instead of deferring to literals.

> Debug statements left in code

Heh... oops!

> MVC callchain antipattern

[randomizePos](#BarMagnet-randomizePos) is a method that should belong to the `BarModel` instance, and now it does appropriately. This method is called from the `ControlPanel` view, which is passed a reference to the model. `ExampleModel` now appropriately receives method calls from `ControlPanel` listeners, which subsequently emit events that the `ExampleScreenView` subscribe to explicitly. 

> Unmaintainable parent node access

Expanding on my explanation for "[duplicated constraints](#comment-dupeConst)", I know that the correct way to define the bounds for [randomizePos](#BarMagnet-randomizePos) is to access them from root-parent `ExampleScreenView`. Otherwise, I was able to resolve the V1 -> M -> V2 chain for adding bars.

> Moving a magnet can occasionally change bar size

I had it set so that additional bars would be smaller than the original. This distinction has since been removed.

> Modularizing commits

I will address each button with actions for one commit.

=====
# New Properties
### <a name="ExampleModel-events"></a> ExampleModel.events
Events for the `ExampleModel` instance.

### <a name="ExampleModel-barFactory"></a> ExampleModel#barFactory()
Creates a default `BarMagnet` positioned at the center of the screen with `width: 262.5` and `height: 52.5`.

### <a name="ExampleModel-addBar"></a> ExampleModel#addBar()
Constructs a new, randomly placed bar with `ExampleModel.barFactory().randomizePos()`. This bar is prepended to the instance array `ExampleModel.extraBars` because z-index on `ExampleScreenView.children` gives priority to objects at the end of the array, and we want to keep the main bar and control panel on top.

### <a name="BarMagnet-randomizePos"></a> BarMagnet#randomizePos([width, height, withRotate])
Randomly sets `BarMagnet.location` to be within `\u00B1width/2` and `\u00B1height/2`. Additionally, `if (withRotate == true)`, randomly sets `BarMagnet.orientation`. Returns a reference to `BarMagnet` for chaining.

=====
# New Events
### ExampleModel.events["addBar"], callback( bar )
- `ExampleScreenView` : constructs a new `BarMagnetNode` with the `BarMagnet` argument `bar` and calls `ExampleScreenView.insertChild(0, BarMagnetNode)`.

### ExampleModel.events["resetViewChildren"], callback()
- `ExampleScreenView` : calls `ExampleScreenView.setChildren( defaultElements )` where `defaultElements` is defined in the `ExampleScreenView` constructor.
