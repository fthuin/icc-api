/**
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.2
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { XHR } from "./XHR"
import * as models from "../model/models"

export class iccContactApi {
  host: string
  headers: Array<XHR.Header>
  constructor(host: string, headers: any) {
    this.host = host
    this.headers = Object.keys(headers).map(k => new XHR.Header(k, headers[k]))
  }

  setHeaders(h: Array<XHR.Header>) {
    this.headers = h
  }

  handleError(e: XHR.Data) {
    if (e.status == 401) throw Error("auth-failed")
    else throw Error("api-error" + e.status)
  }

  closeForHCPartyPatientSecretFKeys(
    hcPartyId?: string,
    secretFKeys?: string
  ): Promise<Array<models.ContactDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/byHcPartySecretForeignKeys/close" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (secretFKeys ? "&secretFKeys=" + secretFKeys : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  createContact(body?: models.ContactDto): Promise<models.ContactDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/contact" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.ContactDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  deleteContacts(contactIds: string): Promise<Array<string> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/{contactIds}".replace("{contactIds}", contactIds + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("DELETE", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  filterBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    body?: models.FilterChain
  ): Promise<models.ContactPaginatedList | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/contact/filter" +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.ContactPaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  filterServicesBy(
    startKey?: string,
    startDocumentId?: string,
    limit?: number,
    body?: models.FilterChain
  ): Promise<models.ServicePaginatedList | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/contact/service/filter" +
      "?ts=" +
      new Date().getTime() +
      (startKey ? "&startKey=" + startKey : "") +
      (startDocumentId ? "&startDocumentId=" + startDocumentId : "") +
      (limit ? "&limit=" + limit : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.ServicePaginatedList(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  findByHCPartyFormId(
    hcPartyId?: string,
    formId?: string
  ): Promise<Array<models.ContactDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/byHcPartyFormId" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (formId ? "&formId=" + formId : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  findByHCPartyFormIds(
    hcPartyId?: string,
    body?: models.ListOfIdsDto
  ): Promise<Array<models.ContactDto> | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/contact/byHcPartyFormIds" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  findByHCPartyPatientSecretFKeys(
    hcPartyId?: string,
    secretFKeys?: string,
    planOfActionIds?: string,
    skipClosedContacts?: boolean
  ): Promise<Array<models.ContactDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/byHcPartySecretForeignKeys" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (secretFKeys ? "&secretFKeys=" + secretFKeys : "") +
      (planOfActionIds ? "&planOfActionIds=" + planOfActionIds : "") +
      (skipClosedContacts ? "&skipClosedContacts=" + skipClosedContacts : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  findDelegationsStubsByHCPartyPatientSecretFKeys(
    hcPartyId?: string,
    secretFKeys?: string
  ): Promise<Array<models.ContactDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/byHcPartySecretForeignKeys/delegations" +
      "?ts=" +
      new Date().getTime() +
      (hcPartyId ? "&hcPartyId=" + hcPartyId : "") +
      (secretFKeys ? "&secretFKeys=" + secretFKeys : "")
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  getContact(contactId: string): Promise<models.ContactDto | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/{contactId}".replace("{contactId}", contactId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.ContactDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  getContacts(body?: models.ListOfIdsDto): Promise<Array<models.ContactDto> | any> {
    let _body = null
    _body = body

    const _url = this.host + "/contact/byIds" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.ContactDto(it)))
      .catch(err => this.handleError(err))
  }
  getEmptyContent(): Promise<models.ContentDto | any> {
    let _body = null

    const _url = this.host + "/contact/service/content/empty" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => new models.ContentDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  getServiceCodesOccurences(
    codeType: string,
    minOccurences: number
  ): Promise<Array<models.LabelledOccurenceDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/service/codes/{codeType}/{minOccurences}"
        .replace("{codeType}", codeType + "")
        .replace("{minOccurences}", minOccurences + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.LabelledOccurenceDto(it)))
      .catch(err => this.handleError(err))
  }
  getServiceLabelsOccurences(
    minOccurences: number
  ): Promise<Array<models.LabelledOccurenceDto> | any> {
    let _body = null

    const _url =
      this.host +
      "/contact/service/labels/{minOccurences}".replace("{minOccurences}", minOccurences + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("GET", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => new models.LabelledOccurenceDto(it)))
      .catch(err => this.handleError(err))
  }
  matchBy(body?: models.Filter): Promise<Array<string> | any> {
    let _body = null
    _body = body

    const _url = this.host + "/contact/match" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.body as Array<JSON>).map(it => JSON.parse(JSON.stringify(it))))
      .catch(err => this.handleError(err))
  }
  modifyContact(body?: models.ContactDto): Promise<models.ContactDto | any> {
    let _body = null
    _body = body

    const _url = this.host + "/contact" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("PUT", _url, headers, _body)
      .then(doc => new models.ContactDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  newDelegations(contactId: string, body?: models.DelegationDto): Promise<models.ContactDto | any> {
    let _body = null
    _body = body

    const _url =
      this.host +
      "/contact/{contactId}/delegate".replace("{contactId}", contactId + "") +
      "?ts=" +
      new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => new models.ContactDto(doc.body as JSON))
      .catch(err => this.handleError(err))
  }
  setContactsDelegations(body?: Array<models.IcureStubDto>): Promise<any | Boolean> {
    let _body = null
    _body = body

    const _url = this.host + "/contact/delegations" + "?ts=" + new Date().getTime()
    let headers = this.headers
    headers = headers
      .filter(h => h.header !== "Content-Type")
      .concat(new XHR.Header("Content-Type", "application/json"))
    return XHR.sendCommand("POST", _url, headers, _body)
      .then(doc => (doc.contentType.startsWith("application/octet-stream") ? doc.body : true))
      .catch(err => this.handleError(err))
  }
}
