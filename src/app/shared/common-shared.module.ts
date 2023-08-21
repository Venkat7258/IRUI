import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AnimateModule } from 'primeng/animate';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { PanelModule } from 'primeng/panel';
import { ScrollTopModule } from "primeng/scrolltop";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { SplitButtonModule } from 'primeng/splitbutton';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { StepsModule } from 'primeng/steps';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    EllipsisPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    TabViewModule,
    SidebarModule,
    TableModule,
    ButtonModule,
    ScrollPanelModule,
    AccordionModule,
    ScrollTopModule,
    NgxPageScrollModule,
    AnimateModule,
    SplitButtonModule,
    DropdownModule,
    PanelModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    ContextMenuModule,
    StepsModule,
    CheckboxModule,
    DialogModule,
    TooltipModule,
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, CardModule, TabViewModule, SidebarModule, TableModule,
    ButtonModule, ScrollPanelModule, AccordionModule, ScrollTopModule, NgxPageScrollModule,
    AnimateModule, SplitButtonModule, MenubarModule, PanelModule, DropdownModule, EllipsisPipe,
    InputTextModule, CardModule, ButtonModule, ContextMenuModule, StepsModule, CheckboxModule,
    DialogModule, TooltipModule],
})
export class CommonSharedModule { }
