import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../services/country/country.service";
import {I_Country} from "../../services/country/country.modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: I_Country[] = [];
  showAddForm = false;
  mode = 'add';
  selectedCountry: I_Country;
  countryForm = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  constructor(
    private countryService: CountryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(
      res => {
        this.countries = res;
      },
      err => console.log(err)
    );
  }

  onAddCountry(): void {
    this.showAddForm = true;
    this.mode = 'add';
  }

  onSubmit() {
    let request = this.mode == 'add' ?
      this.countryService.addCountry(this.countryForm.value) :
      this.countryService.updateCountry({id: this.selectedCountry?.id, name: this.countryForm.value.name});
    request.subscribe(
      res => {
        if (this.mode == 'add') {
          this.countries.push(res);
        } else {
          let index = this.countries.findIndex(country => country.id === this.selectedCountry.id);
          this.countries.splice(index, 1, res);
        }
        this.countryForm.reset();
      },
      err => console.log(err)
    )
  }

  onEditCountry(country: I_Country) {
    this.showAddForm = true;
    this.mode = 'edit';
    this.countryForm.get('name')?.setValue(country.name);
    this.selectedCountry = country;
  }

  onDeleteCountry(country: I_Country): void {
    this.selectedCountry = country;
    this.countryService.deleteCountry(country.id).subscribe(
      () => {
        let index = this.countries.findIndex(country => country.id === this.selectedCountry.id);
        this.countries.splice(index, 1);
      }, err => {
        console.log(err);
      }
    );
  }

  onCancel(): void {
    this.showAddForm = false;
    this.countryForm.reset();
  }

  openCitiesOfCountry(countryId: number): void {
    this.router.navigateByUrl('/cities/' + countryId);
  }
}
