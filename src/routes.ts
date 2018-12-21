import {Routes} from '@angular/router';
import { MemberListComponent } from './app/members/member-list/member-list.component';
import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { AuthGuard } from './app/_guards/auth.guard';
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './app/_resolvers/member-detail.resolver';
import { MemberListResolver } from './app/_resolvers/member-list.resolver';

export const appRoutes: Routes = [
    { path: 'members', component: MemberListComponent, canActivate: [AuthGuard], resolve: {users: MemberListResolver} },
    { path: 'members/:id', component: MemberDetailComponent, canActivate: [AuthGuard], resolve: {user: MemberDetailResolver} },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuard] },
    // If application has more than 5 protected routers user below
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: []
    // },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

