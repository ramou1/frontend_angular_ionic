import { Platform } from "@angular/cdk/platform";
import { Injectable, Injector } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NbDialogService, NbIconLibraries, NbSidebarService, NbToastrService } from "@nebular/theme";

@Injectable({
    providedIn: 'root'
})

export abstract class BasePage {
    protected activatedRoute: ActivatedRoute;
    protected dialogSrvc: NbDialogService;
    protected iconLibraries: NbIconLibraries;
    protected fb: FormBuilder;
    protected platform: Platform;
    protected router: Router;
    protected sidebarSrvc: NbSidebarService;
    // protected storage: StorageService;
    // protected tasksSrvc: TasksService;
    protected toastrSrvc: NbToastrService;
    // protected userSrvc: UserService;

    constructor(injector: Injector) {
        this.activatedRoute = injector.get(ActivatedRoute);
        this.dialogSrvc = injector.get(NbDialogService);
        this.iconLibraries = injector.get(NbIconLibraries);
        this.fb = injector.get(FormBuilder);
        this.platform = injector.get(Platform);
        this.router = injector.get(Router);
        this.sidebarSrvc = injector.get(NbSidebarService);
        // this.storage = injector.get(StorageService);
        // this.tasksSrvc = injector.get(TasksService);
        this.toastrSrvc = injector.get(NbToastrService);
        // this.userSrvc = injector.get(UserService);
    }
}