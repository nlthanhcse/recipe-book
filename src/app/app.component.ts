import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLinkClicked = 'recipe';

  getRecipeClicked(navLinkClicked) {
    this.navLinkClicked = navLinkClicked;
  }

}
