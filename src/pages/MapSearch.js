import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'

const MapSearch = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <form className="form-inline">
            <div className="row">
              <div className="col-xs-8 col-sm-10">
                <div className="form-group">
                  <label className="sr-only" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control input-lg"
                    id="address"
                    placeholder="London"
                    required
                  />
                </div>
              </div>
              <div className="col-xs-4 col-sm-2">
                <button type="submit" className="btn btn-default btn-lg">
                  <span
                    className="glyphicon glyphicon-search"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-12">
              <p className="bg-info">London, United Kingdom</p>
              <div className="map"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSearch
