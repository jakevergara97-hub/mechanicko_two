export function AddressInformation({
                                    regions,
                                    provinces,
                                    cities,
                                    barangays,

                                    formData,
                                    setFormData,
                                    touched,
                                    setTouched,

                                    handleRegionSelection,
                                    handleProvinceSelection,
                                    handleCitySelection,
                                    handleBarangaySelection,

                                    selectedRegion,

                                    }) {

    return (
        <div>
            <select
                id="region-select"
                name="region"
                value={formData.region}
                onChange={(e) => handleRegionSelection(e)}
                onBlur={(e) => setTouched({
                        ...touched,
                        region: true,
                    })}
            >
                {regions.length === 0
                    && <option value="" disabled>Regions loading...</option>
                }

                <option value="" disabled>Select region</option>

                {regions.map((region) =>
                    <option key={region} value={region}>{region}</option>
                )}
            </select>

            {touched.region && !formData.region
                    && (<p style={{color:'red'}}>Region is required</p>)
            }

            <br />

            {selectedRegion === 'NATIONAL CAPITAL REGION (NCR)' ?
                (
                    <div>
                        <select
                            id="city-select"
                            name="city"
                            value={formData.city}
                            onChange={(e) => handleCitySelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                            <option value="" disabled>Select city/town</option>

                            {cities.length !== 0 &&
                                cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))
                            }
                        </select>

                        {touched.city && !formData.city &&
                            (<p style={{color:'red'}}>City/Town is required</p>)
                        }

                        <br />
                        <select
                            id="barangay-select"
                            name="barangay"
                            value={formData.barangay}
                            onChange={(e) => handleBarangaySelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                            <option value="" disabled>Select barangay</option>

                            {barangays.length !== 0 &&
                                barangays.map((barangay) => (
                                    <option key={barangay} value={barangay}>
                                        {barangay}
                                    </option>
                                ))
                            }
                        </select>

                        {touched.barangay && !formData.barangay &&
                            (<p style={{color:'red'}}>Barangay is required</p>)
                        }

                    </div>
                )
                :
                (
                    <div>
                        <select
                            id="province-select"
                            name="province"
                            value={formData.province}
                            onChange={(e) => handleProvinceSelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >
                            <option value="" disabled>Select province</option>

                            {provinces.length !== 0 &&
                                provinces.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))
                            }
                        </select>

                        {touched.province && !formData.province &&
                            (<p style={{color:'red'}}>Province is required</p>)
                        }

                        <br />
                        <select
                            id="city-select"
                            name="city"
                            value={formData.city}
                            onChange={(e) => handleCitySelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                            <option value="" disabled>Select city/town</option>

                            {cities.length !== 0 &&
                                cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))
                            }
                        </select>

                        {touched.city && !formData.city &&
                            (<p style={{color:'red'}}>City/Town is required</p>)
                        }

                        <br />
                        <select
                            id="barangay-select"
                            name="barangay"
                            value={formData.barangay}
                            onChange={(e) => handleBarangaySelection(e)}
                            onBlur={(e) => setTouched(prev => ({
                                    ...prev,
                                    [e.target.name]: true,
                                }))
                            }
                        >

                            <option value="" disabled>Select barangay</option>

                            {barangays.length !== 0 &&
                                barangays.map((barangay) => (
                                    <option key={barangay} value={barangay}>
                                        {barangay}
                                    </option>
                                ))
                            }
                        </select>

                        {touched.barangay && !formData.barangay &&
                            (<p style={{color:'red'}}>Barangay is required</p>)
                        }
                    </div>
                )
            }
        </div>
    );

}