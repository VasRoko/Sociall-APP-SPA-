import {Routes} from '@angular/router';
import { MemberListComponent } from './app/members/member-list/member-list.component';
import { MessagesComponent } from './app/messages/messages.component';
import { ListsComponent } from './app/lists/lists.component';
import { AuthGuard } from './app/_guards/auth.guard';
import { MemberDetailComponent } from './app/members/member-detail/member-detail.component';
import { MemberDetailResolver } from './app/_resolvers/member-detail.resolver';
import { MemberListResolver } from './app/_resolvers/member-list.resolver';
import { MemberEditComponent } from './app/members/member-edit/member-edit.component';
import { MemberEditResolver } from './app/_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './app/_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './app/_resolvers/list.resolver';
import { MessagesResolver } from './app/_resolvers/messages.resolver';

export const appRoutes: Routes = [
    { path: 'members', component: MemberListComponent, canActivate: [AuthGuard], resolve: {users: MemberListResolver} },
    { path: 'members/:id', component: MemberDetailComponent, canActivate: [AuthGuard], resolve: {user: MemberDetailResolver} },
    { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard], resolve: {messages: MessagesResolver }  },
    { path: 'lists', component: ListsComponent, canActivate: [AuthGuard], resolve: {users: ListsResolver} },
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: []
    // },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

