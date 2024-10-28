import { useState, useEffect } from 'react';
import { Select, MenuItem, Typography, FormControl, InputLabel } from '@material-ui/core';
import { GetCountries, GetState, GetCity, GetLanguages } from 'react-country-state-city';

function Country() {
  const [countryId, setCountryId] = useState('');
  const [stateId, setStateId] = useState('');
  const [cityId, setCityId] = useState('');
  const [language, setLanguage] = useState('');

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <section className="text-white">
        <Typography variant="h6">Country</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="country-select-label">Select Country</InputLabel>
          <Select
            labelId="country-select-label"
            value={countryId}
            onChange={(e) => {
              const selectedCountry = countriesList.find(country => country.id === e.target.value);
              setCountryId(selectedCountry.id);
              GetState(selectedCountry.id).then((result) => {
                setStateList(result);
                setStateId(''); // Reset state selection
                setCityList([]); // Reset city list
                setCityId(''); // Reset city selection
              });
            }}
            label="Select Country"
          >
            {countriesList.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      <section className="text-white" style={{ marginTop: '20px' }}>
        <Typography variant="h6">State</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="state-select-label">Select State</InputLabel>
          <Select
            labelId="state-select-label"
            value={stateId}
            onChange={(e) => {
              const selectedState = stateList.find(state => state.id === e.target.value);
              setStateId(selectedState.id);
              GetCity(countryId, selectedState.id).then((result) => {
                setCityList(result);
                setCityId(''); // Reset city selection
              });
            }}
            label="Select State"
            disabled={!countryId}
          >
            {stateList.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      <section className="text-white" style={{ marginTop: '20px' }}>
        <Typography variant="h6">City</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            value={cityId}
            onChange={(e) => {
              const selectedCity = cityList.find(city => city.id === e.target.value);
              setCityId(selectedCity.id);
            }}
            label="Select City"
            disabled={!stateId}
          >
            {cityList.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>

      <section className="text-white" style={{ marginTop: '20px' }}>
        <Typography variant="h6">Language</Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="language-select-label">Select Language</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            label="Select Language"
          >
            {languageList.map((lang) => (
              <MenuItem key={lang.id} value={lang.id}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>
    </div>
  );
}

export default Country;
