import { Component, OnInit } from '@angular/core';
import {CityService} from "../../services/city/city.service";
import {I_City} from "../../services/city/city.modal";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../services/country/country.service";
import {I_Country} from "../../services/country/country.modal";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {
  cities: I_City[] = [];
  countries: I_Country[] = [];
  showAddForm = false;
  mode = 'add';
  selectedCity: I_City;
  countries_fetched = false;
  cityForm = new FormGroup({
    countryId: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required)
  });

  constructor(private cityService: CityService,
              private countryService: CountryService) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.cityService.getCities().subscribe(
      res => {
        this.cities = res;
      }, err => {
        console.log(err);
      }
    );
  }

  onAddCity (): void {
    this.mode = 'add';
    this.showAddForm = true;
    if (!this.countries_fetched) {
      this.getCountries();
    }
  }

  onSubmit (): void {
    let request = this.mode == 'add' ?
      this.cityService.addCity(this.cityForm.value) :
      this.cityService.updateCity({
        id: this.selectedCity.id,
        countryId: this.cityForm.value.countryId,
        name: this.cityForm.value.name
      });
    request.subscribe(
      res => {
        if (this.mode == 'add') {
          this.cities.push(res);
          this.cityForm.reset();
        } else {
          let index = this.cities.findIndex(city => city.id === this.selectedCity.id);
          this.cities.splice(index, 1, res);
        }
      }, err => {
        console.log(err);
      }
    );
  }

  getCountries(): void {
    this.countryService.getCountries().subscribe(
      res => {
        this.countries = res;
        this.countries_fetched = true;
      },
      err => console.log(err)
    )
  }

  onCancel (): void {
    this.showAddForm = false;
    this.cityForm.reset();
  }

  onEditCity (city: I_City): void {
    this.showAddForm = true;
    this.selectedCity = city;
    this.mode = 'edit';
    if (!this.countries_fetched) {
      this.getCountries();
    }
    this.cityForm.get('countryId')?.setValue(city.countryId);
    this.cityForm.get('name')?.setValue(city.name);
  }

  onDeleteCity (city: I_City): void {
    this.selectedCity = city;
    this.cityService.deleteCity(city.id).subscribe(
      () => {
        let index = this.cities.findIndex(city => city.id === this.selectedCity.id);
        this.cities.splice(index, 1);
      }, err => {
        console.log(err);
      }
    );
  }


}
