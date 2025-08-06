
### Core Signal-Based Features:
- **Signals** - Reactive primitive for state management
- **Computed signals** - Derived values from other signals  
- **Effect** - Side effects triggered by signal changes
- **Signal inputs** - Component inputs as signals
- **Signal queries** - ViewChild/ContentChild as signals
- **Model inputs** - Two-way binding with signals

### Change Detection & Performance:
- **Zoneless change detection** - Lightweight change detection without Zone.js dependency
- **Local change detection** - Optimized change detection strategies
- **OnPush with signals** - Enhanced OnPush strategy
- **ChangeDetectionScheduler** - New change detection scheduling

### New Control Flow Syntax:
- **@if** - New conditional rendering (replaces *ngIf)
- **@for** - New loops (replaces *ngFor) 
- **@switch** - New switch statements (replaces *ngSwitch)
- **@empty** - Handle empty states in @for
- **@placeholder** - Loading states
- **@error** - Error states
- **@loading** - Loading indicators

### Resource Management APIs:
- **resource()** - Elegant way to manage asynchronous API calls in signal-based applications
- **rxResource()** - Works with Observables while resource works with Promises
- **ResourceRef** - Return type of resource functions
- **ResourceStatus** - Track loading/error states

### SSR & Hydration:
- **Non-destructive hydration** - Improved SSR hydration
- **SSR debugging tools** - Modern SSR debugging tools introduced in Angular 18
- **Event replay** - Replay events during hydration
- **Incremental hydration** - Partial hydration strategies

### Standalone & Architecture:
- **Standalone components** - Defaulting to true in Angular 18
- **Standalone APIs** - Bootstrapping without modules
- **provideExperimentalZonelessChangeDetection** - Enable zoneless mode
- **ApplicationConfig** - New configuration approach

### Developer Experience:
- **Angular DevKit** - Enhanced development tools
- **ng-optimized-image** - Optimized image directive
- **Angular Material 3** - Material Design 3 support
- **CDK improvements** - Component Development Kit updates
- **Schematics updates** - Enhanced code generation

### Forms & Validation:
- **Signal-based forms** - Reactive forms with signals
- **FormControl signals** - Form controls as signals
- **Validators with signals** - Signal-aware validation

### Testing & Debugging:
- **Signal testing utilities** - TestBed improvements for signals
- **Zoneless testing** - Testing without Zone.js
- **Component testing harnesses** - Enhanced testing tools

### Experimental Features:
- **View Transitions API** - Browser native page transitions
- **@defer** - Lazy loading blocks
- **@placeholder/@loading/@error** - Defer block states
- **Material 3 theming** - New theming system
- **Angular animations with signals** - Signal-aware animations

### Migration & Compatibility:
- **Control flow migration** - Automated migration to new syntax
- **Signal migration schematics** - Auto-convert to signals
- **Zoneless migration guide** - Move away from Zone.js
- **Standalone migration** - Convert to standalone components



### NgComponentOutlet Enhancements:
- **NgComponentOutlet componentInstance** - Angular 19.1.0 introduces a new getter that allows developers to access the instance of the dynamically created component
- **NgComponentOutlet inputs binding** - New binding input in Angular 17 removes the need for explicit injectors
- **NgComponentOutlet with signals** - Integration with signal-based components
- **Dynamic component instance access** - Access methods and properties of the component, update data or pass new values after it has been loaded
- **Improved DI integration** - Better dependency injection support for dynamic components

These NgComponentOutlet improvements make dynamic component creation much easier and more powerful. The componentInstance property allows access to the instance of the component created by the directive, which was previously difficult to achieve.

So your complete learning list now includes all the previous features I mentioned plus these NgComponentOutlet enhancements. The NgComponentOutlet improvements are particularly useful for:

- Creating dynamic forms and UI components
- Building plugin-like architectures
- Runtime component loading scenarios
- Component factories and dynamic rendering

These features make NgComponentOutlet much more practical for real-world dynamic component scenarios compared to the older, more complex approaches that required manual component creation.

## Model Inputs (Already in the list, but expanded):

### Model Inputs - Two-Way Binding with Signals:
- **model()** - Create two-way bindable signal inputs
- **ModelSignal** - Type for model inputs
- **model.required()** - Required model inputs
- **model.withAlias()** - Model inputs with custom property names
- **Two-way binding with signals** - [(ngModel)] equivalent for signals
- **Parent-child signal communication** - Bi-directional data flow
- **ModelRef** - Reference type for model signals

### Usage Pattern:
```typescript
// Child component
export class ChildComponent {
  value = model<string>(''); // Creates two-way bindable signal
  count = model.required<number>(); // Required model input
}

// Parent template
<child [(value)]="parentValue" [(count)]="parentCount" />
```

Let’s start from the **very beginning** and build up.

--------------------------------
1. What “output” means in Angular
--------------------------------
Angular **components** can **emit events** so that a **parent component** (or any other code that uses the component) can react.  
In the older API we created an `@Output()` property that was an `EventEmitter`.  
Starting with Angular 17+ we also have a new **signal-based output API**.

So there are **two syntaxes** you will see today:

A. Classic decorator API  
   `@Output() somethingHappened = new EventEmitter<string>();`

B. Modern function API (developer-preview, but stable in v20)  
   `somethingHappened = output<string>();`

Both do the same job: expose a stream of events **out of** the component.

--------------------------------
2. Minimal example – classic API
--------------------------------
child.component.ts
```ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="send()">Click me</button>
  `
})
export class ChildComponent {
  @Output() messageSent = new EventEmitter<string>();

  send() {
    this.messageSent.emit('Hello from child!');
  }
}
```

parent.component.html
```html
<app-child (messageSent)="onMessage($event)"></app-child>
<p>Last message: {{ lastMessage }}</p>
```

parent.component.ts
```ts
export class ParentComponent {
  lastMessage = '';

  onMessage(msg: string) {
    this.lastMessage = msg;
  }
}
```

- `@Output()` tells Angular that this property is **publicly available for listening**.  
- `(messageSent)` in the parent template is **event binding** – the parent runs `onMessage` every time the child emits.  
- `$event` is the payload passed to `emit(...)`.

--------------------------------
3. Same example – new function API
--------------------------------
child.component.ts
```ts
import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="send()">Click me</button>
  `
})
export class ChildComponent {
  messageSent = output<string>();   // no decorator, no new EventEmitter()

  send() {
    this.messageSent.emit('Hello from child!');
  }
}
```
Everything else (HTML and parent TS) stays **identical**.

Benefits of the new API  
- Less boilerplate (no `new EventEmitter`, no decorator).  
- Fully typed; you can’t emit the wrong type.  
- Works inside `input`/`output`-only components (no constructor needed).

--------------------------------
4. Listening programmatically
--------------------------------
Sometimes you don’t bind in the template but want to listen inside the parent component:

parent.component.ts
```ts
@ViewChild(ChildComponent) child!: ChildComponent;

ngAfterViewInit() {
  // classic
  this.child.messageSent.subscribe(msg => console.log(msg));

  // new API – returns an Observable too
  this.child.messageSent.subscribe(msg => console.log(msg));
}
```

--------------------------------
5. Two-way binding sugar (“banana-in-a-box”)
--------------------------------
When an output name is exactly `xxxChange` and you also have an `@Input() xxx`, Angular lets you write:

```html
<counter [(count)]="value"></counter>
```
which is short for
```html
<counter [count]="value" (countChange)="value = $event"></counter>
```

--------------------------------
6. Common pitfalls
--------------------------------
- Forgetting parentheses in the parent template: `(messageSent)` not `messageSent`.  
- Trying to emit an object that contains functions – it will not survive JSON if you later use server-side rendering.  
- Emitting too frequently without throttling in high-frequency scenarios (scroll, mouse-move).

--------------------------------
7. Quick checklist
--------------------------------
1. Inside child: decide what data type you will emit.  
2. `output<type>()`, or `@Output() name = new EventEmitter<type>()`.  
3. Call `.emit(value)` when something happens.  
4. In parent template: `(name)="handler($event)"`.  
5. In parent TS: create `handler(payload: type) { ... }`.

That’s all there is to **output in Angular**—it’s just a typed event channel from child to parent.



<img width="1920" height="1080" alt="Screenshot (636)" src="https://github.com/user-attachments/assets/63be8108-818f-4e23-832f-a4a607f4a15f" />
<img width="1920" height="1080" alt="Screenshot (637)" src="https://github.com/user-attachments/assets/0679bba4-152d-45c2-bfa6-0d5b502185d0" />
<img width="1920" height="1080" alt="Screenshot (638)" src="https://github.com/user-attachments/assets/3d94d521-8020-4dc1-ab5d-69364233add7" />
<img width="1920" height="1080" alt="Screenshot (639)" src="https://github.com/user-attachments/assets/2065ce7a-aa6f-478c-a05b-ce5b7985d72a" />
<img width="1920" height="1080" alt="Screenshot (640)" src="https://github.com/user-attachments/assets/8828cb26-0db7-41a7-a155-bfb763d9a4b4" />
<img width="1920" height="1080" alt="Screenshot (641)" src="https://github.com/user-attachments/assets/7fc94988-aa05-40ba-ab63-2eb45b7f1c97" />
<img width="1920" height="1080" alt="Screenshot (642)" src="https://github.com/user-attachments/assets/9a1f3c90-cbb2-487e-9401-654e9245fe2a" />
<img width="1920" height="1080" alt="Screenshot (643)" src="https://github.com/user-attachments/assets/328d466b-5c67-4215-82aa-613623bda332" />
<img width="1920" height="1080" alt="Screenshot (644)" src="https://github.com/user-attachments/assets/7e75d345-2101-433c-bc80-864f1c919e42" />
<img width="1920" height="1080" alt="Screenshot (645)" src="https://github.com/user-attachments/assets/fe700eb9-e819-4dcf-b144-9e6f879d0be9" />
<img width="1920" height="1080" alt="Screenshot (646)" src="https://github.com/user-attachments/assets/703712cd-3049-45b0-8c12-3a29c6304713" />
<img width="1920" height="1080" alt="Screenshot (647)" src="https://github.com/user-attachments/assets/51408dfc-177e-4900-b463-cb2e1c58d9b6" />
<img width="1920" height="1080" alt="Screenshot (648)" src="https://github.com/user-attachments/assets/6ed695e0-dc98-4ba5-b359-5f255890d317" />
<img width="1920" height="1080" alt="Screenshot (649)" src="https://github.com/user-attachments/assets/3e44789b-e729-4f9d-8d1b-46ad2e9fcbe2" />
<img width="1920" height="1080" alt="Screenshot (650)" src="https://github.com/user-attachments/assets/10424b1a-99dc-4e56-8ce2-82352d01398d" />
<img width="1920" height="1080" alt="Screenshot (651)" src="https://github.com/user-attachments/assets/3659106c-4697-4ecb-9bb1-418a7e941b6f" />
<img width="1920" height="1080" alt="Screenshot (652)" src="https://github.com/user-attachments/assets/29cd8225-fdaf-4585-bca3-25d989e537a1" />
<img width="1920" height="1080" alt="Screenshot (653)" src="https://github.com/user-attachments/assets/6169ab82-0759-4c63-93db-c896ccc08315" />
<img width="1920" height="1080" alt="Screenshot (654)" src="https://github.com/user-attachments/assets/3b9d677d-5c83-4960-b2e4-330d840a5ae1" />
<img width="1920" height="1080" alt="Screenshot (655)" src="https://github.com/user-attachments/assets/63e80fcf-7306-4d69-81d1-58f1acd6891a" />
<img width="1920" height="1080" alt="Screenshot (656)" src="https://github.com/user-attachments/assets/be2d6b9f-c288-42e7-9385-19b8cf2f28a8" />
<img width="1920" height="1080" alt="Screenshot (657)" src="https://github.com/user-attachments/assets/994d4217-a676-4f89-bbf3-6a7c701bc866" />
<img width="1920" height="1080" alt="Screenshot (658)" src="https://github.com/user-attachments/assets/1c8f49f7-0290-42c2-ad1b-cd8fa4156e78" />
<img width="1920" height="1080" alt="Screenshot (659)" src="https://github.com/user-attachments/assets/6e2a088e-cef8-42f0-992b-632ac02cccaf" />
<img width="1920" height="1080" alt="Screenshot (660)" src="https://github.com/user-attachments/assets/de5161b7-30d9-474b-9095-3fc22f542464" />
<img width="1920" height="1080" alt="Screenshot (661)" src="https://github.com/user-attachments/assets/27cecb00-d4b6-409a-ac33-f9c7f8a12cd9" />
<img width="1920" height="1080" alt="Screenshot (662)" src="https://github.com/user-attachments/assets/522c948d-cea4-4baa-9c92-b1aa858bc077" />
<img width="1920" height="1080" alt="Screenshot (663)" src="https://github.com/user-attachments/assets/a5c16fda-230c-4423-9b6f-80f4d2a2b76d" />
<img width="1920" height="1080" alt="Screenshot (664)" src="https://github.com/user-attachments/assets/163a247a-448a-4549-84cf-8e8597c2b55e" />
<img width="1920" height="1080" alt="Screenshot (665)" src="https://github.com/user-attachments/assets/93dd5c0b-8aed-42cd-8ff8-30642b7222e0" />
<img width="1920" height="1080" alt="Screenshot (666)" src="https://github.com/user-attachments/assets/792dea95-e1ad-4ac7-99b1-5a14740e6371" />
<img width="1920" height="1080" alt="Screenshot (667)" src="https://github.com/user-attachments/assets/3f565bf9-b45a-4e38-b47f-06f7f1265527" />
<img width="1920" height="1080" alt="Screenshot (668)" src="https://github.com/user-attachments/assets/10a203a2-e689-4e32-b16d-ea25a3074e03" />
<img width="1920" height="1080" alt="Screenshot (669)" src="https://github.com/user-attachments/assets/3d5f5b9b-2f12-4a65-8f16-1beef99f37e9" />
<img width="1920" height="1080" alt="Screenshot (670)" src="https://github.com/user-attachments/assets/78bf5d6d-0b86-493f-9ded-985d9d3c2bcb" />
<img width="1920" height="1080" alt="Screenshot (671)" src="https://github.com/user-attachments/assets/266b970d-602e-44d4-bf4e-aa961f2123b2" />
<img width="1920" height="1080" alt="Screenshot (672)" src="https://github.com/user-attachments/assets/7726ec06-6e57-4d9b-901c-a028406dee8f" />
<img width="1920" height="1080" alt="Screenshot (673)" src="https://github.com/user-attachments/assets/35214515-1482-4d7d-96e2-9ee8a3770312" />
<img width="1920" height="1080" alt="Screenshot (674)" src="https://github.com/user-attachments/assets/5135d845-4724-447c-bb49-64c6399c3498" />
<img width="1920" height="1080" alt="Screenshot (675)" src="https://github.com/user-attachments/assets/a19657f0-8b4c-455c-9be2-18b8b8a15f86" />
<img width="1920" height="1080" alt="Screenshot (676)" src="https://github.com/user-attachments/assets/acf09662-c67f-4c10-b00c-0f5d65359e92" />
<img width="1920" height="1080" alt="Screenshot (677)" src="https://github.com/user-attachments/assets/4a38374e-1ac5-49c0-a409-2bf24d4a3ae5" />
<img width="1920" height="1080" alt="Screenshot (678)" src="https://github.com/user-attachments/assets/884bceb7-c6b4-4b46-a47e-1cda0dd56aef" />
<img width="1920" height="1080" alt="Screenshot (679)" src="https://github.com/user-attachments/assets/5506f437-33b5-4ca0-9496-7905b7955279" />
<img width="1920" height="1080" alt="Screenshot (680)" src="https://github.com/user-attachments/assets/7f094535-f69b-44d0-bbb2-4ad5f584ac17" />
<img width="1920" height="1080" alt="Screenshot (681)" src="https://github.com/user-attachments/assets/c4f729b9-b720-4cbb-86cb-6e50f781698e" />
<img width="1920" height="1080" alt="Screenshot (682)" src="https://github.com/user-attachments/assets/3811df57-0114-4cb7-af16-1e33fd97c07a" />
<img width="1920" height="1080" alt="Screenshot (683)" src="https://github.com/user-attachments/assets/98216654-3c5e-49c8-8c7a-372428a968c5" />
<img width="1920" height="1080" alt="Screenshot (684)" src="https://github.com/user-attachments/assets/3dde5d3d-dcc0-48bc-b2e1-665146c8d224" />
<img width="1920" height="1080" alt="Screenshot (685)" src="https://github.com/user-attachments/assets/c1d69215-0dd6-4ed3-bcf5-5a9eb04ade01" />
<img width="1920" height="1080" alt="Screenshot (686)" src="https://github.com/user-attachments/assets/c7470fad-3455-40c6-90be-51413046a147" />
<img width="1920" height="1080" alt="Screenshot (687)" src="https://github.com/user-attachments/assets/a3d59f1e-aee2-423d-aaa3-5e2718142995" />
<img width="1920" height="1080" alt="Screenshot (688)" src="https://github.com/user-attachments/assets/e82b4c24-ce8f-4800-8f37-6ed409414da2" />
