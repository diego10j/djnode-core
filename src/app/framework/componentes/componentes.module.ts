import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla/tabla.component';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import {InputMaskModule} from 'primeng/inputmask';
import {CheckboxModule} from 'primeng/checkbox';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {MultiSelectModule} from 'primeng/multiselect';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { PipesModule } from '../../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {PanelModule} from 'primeng/panel';
import {ContextMenuModule} from 'primeng/contextmenu';
import {PaginatorModule} from 'primeng/paginator';
import {DpDatePickerModule} from 'ng2-date-picker';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { BarraComponent } from './barra/barra.component';
import { BotonComponent } from './boton/boton.component';
import {TreeModule} from 'primeng/tree';
import {FileUploadModule} from 'primeng/fileupload';
import {OrderListModule} from 'primeng/orderlist';
import { FormatoTablaComponent } from './formato-tabla/formato-tabla.component';
import { VisualizadorImagenComponent } from './visualizador-imagen/visualizador-imagen.component';
import { ArbolComponent } from './arbol/arbol.component';
import { AngularSplitModule } from 'angular-split';
import { DivisionComponent } from './division/division.component';
@NgModule({
  declarations: [
    TablaComponent,
    CabeceraComponent,
    BarraComponent,
    BotonComponent,
    ArbolComponent,
    FormatoTablaComponent,
    VisualizadorImagenComponent,
    DivisionComponent,
  ],
  exports: [
    TablaComponent,
    CabeceraComponent,
    BarraComponent,
    BotonComponent,
    ArbolComponent,
    DivisionComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    OverlayPanelModule,
    MultiSelectModule,
    AutoCompleteModule,
    TieredMenuModule,
    PanelModule,
    InputTextareaModule,
    PaginatorModule,
    FileUploadModule,
    OrderListModule,
    DpDatePickerModule,
    ContextMenuModule,
    TreeModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSplitModule.forRoot(),
  ]
})
export class ComponentesModule { }
