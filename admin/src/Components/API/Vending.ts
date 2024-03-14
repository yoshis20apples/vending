// Automatically generated by cinp-codegen from http://localhost:8888/api/v1/ at 2024-03-05T20:44:16.407876

import CInP, { List } from 'cinp'

export interface ListFilter {};
export interface QueryFilter { toFilter(): object | undefined };
export class ListFilterAll implements ListFilter {};
type ModelUpdate<T> = T | Record<string, any>;
type ModelConstructorSource<T> = T | Record<string, any> | string | number | undefined; // and any other types used by pks

export class ListQueryFilter implements ListFilter
{
  filter?: QueryFilter;
  sort?: string[];

  constructor( { filter, sort }: { filter?: QueryFilter, sort?: string[] } )
  {
    this.filter = filter;
    this.sort = sort;
  }
}

export interface ListParamaters
{
  filter?: ListFilter;
  position?: number;
  count?: number;
}

function filterConvert( filter_items: Record<string, any> ): object
{
  const item_list = [];

  for( const [ field, value ] of Object.entries( filter_items ) )
  {
    if( value === undefined )
      continue;

    item_list.push( { 'field': field, 'value': value, 'operation': '=' } );
  }

  while( item_list.length > 1 )
    item_list.push( { 'operation': 'and', 'left': item_list.pop(), 'right': item_list.pop() } );

  return item_list[0];
}

export class Vending
{
  private cinp: CInP;

  constructor( host: string, using_cookies: boolean=false )
  {
    this.cinp = new CInP( host );
    this.cinp.using_cookies = using_cookies;
  }

  async check(): Promise<boolean>
  {
    return this.cinp.describe( '/api/v1/' ).then( res => res.version === '1.0' );
  }

  setHeader( name: string, value: string ): void
  {
    return this.cinp.setHeader( name, value );
  }

  raw( verb: string, uri: string, data: object, header_map: Record<string, string> ): Promise<unknown>
  {
    return this.cinp.raw( verb, uri, data, header_map );
  }
  // Namespace  at /api/v1/ version 1.0
/*

*/

  // Namespace Auth at /api/v1/Auth/ version 2.0
/*

*/

  // Model User at /api/v1/Auth/User

  async Auth_User_call_login( username: string, password: string ): Promise<string>
  {
    const data = await this.cinp.callOne( "/api/v1/Auth/User(login)", { "username": username, "password": password } );
    return ( data as string );
  }


  async Auth_User_call_logout(): Promise<void>
  {
    await this.cinp.callOne( "/api/v1/Auth/User(logout)", {} );
    return;
  }


  async Auth_User_call_whoami(): Promise<string>
  {
    const data = await this.cinp.callOne( "/api/v1/Auth/User(whoami)", {} );
    return ( data as string );
  }

  async Auth_User_call_changePassword( password: string ): Promise<void>
  {
    await this.cinp.callOne( "/api/v1/Auth/User(changePassword)", { "password": password } );
    return;
  }


  // Model User (end)
  // Namespace Auth (end)
  // Namespace Customers at /api/v1/Customers/ version 0.1
/*

*/

  // Model Customer at /api/v1/Customers/Customer

  async Customers_Customer_get( id: number ): Promise<Customers_Customer>
  {
    const response = await this.cinp.getOne<Customers_Customer>( "/api/v1/Customers/Customer:" + id + ":" );

    return new Customers_Customer( this, response );
  }

  async Customers_Customer_create( data: Customers_Customer ): Promise<void>
  {
    const response = await this.cinp.create<Customers_Customer>( "/api/v1/Customers/Customer", data._as_map( true ) );

    data._update( response.data );
  }

  async Customers_Customer_update( id: number, data: Customers_Customer ): Promise<void>
  {
    data._update( await this.cinp.updateOne<Customers_Customer>( "/api/v1/Customers/Customer:" + id + ":", data._as_map( false ) ) );
  }

  async Customers_Customer_delete( id: number ): Promise<void>
  {
    await this.cinp.delete( "/api/v1/Customers/Customer:" + id + ":" );
  }

  _Customers_Customer_filter_lookup( filter: ListFilter | undefined ): [ string | undefined, Record<string, any> | undefined ]
  {
    if( filter === undefined || filter instanceof ListFilterAll )
      return [ undefined, undefined ];


    throw TypeError( 'Filter ' + filter + ' is not valid' );
  }

  async Customers_Customer_get_multi( { filter, position, count }: ListParamaters ): Promise<Record<string, Customers_Customer>>
  {
    const [ filter_name, filter_value_map ] = this._Customers_Customer_filter_lookup( filter );

    const response = await this.cinp.getFilteredObjects<Customers_Customer>( "/api/v1/Customers/Customer", filter_name, filter_value_map, position, count );

    for ( var key in response )
    {
      response[ key ] = new Customers_Customer( this, response[ key ] );
    }

    return response;
  }

  async Customers_Customer_list( { filter, position, count }: ListParamaters ): Promise<List>
  {
    const [ filter_name, filter_value_map ] = this._Customers_Customer_filter_lookup( filter );
    return await this.cinp.list( "/api/v1/Customers/Customer", filter_name, filter_value_map, position, count );
  }

  // Model Customer (end)
  // Namespace Customers (end)
  // Namespace Products at /api/v1/Products/ version 0.1
/*

*/

  // Model ProductGroup at /api/v1/Products/ProductGroup

  async Products_ProductGroup_get( id: number ): Promise<Products_ProductGroup>
  {
    const response = await this.cinp.getOne<Products_ProductGroup>( "/api/v1/Products/ProductGroup:" + id + ":" );

    return new Products_ProductGroup( this, response );
  }

  async Products_ProductGroup_create( data: Products_ProductGroup ): Promise<void>
  {
    const response = await this.cinp.create<Products_ProductGroup>( "/api/v1/Products/ProductGroup", data._as_map( true ) );

    data._update( response.data );
  }

  async Products_ProductGroup_update( id: number, data: Products_ProductGroup ): Promise<void>
  {
    data._update( await this.cinp.updateOne<Products_ProductGroup>( "/api/v1/Products/ProductGroup:" + id + ":", data._as_map( false ) ) );
  }

  async Products_ProductGroup_delete( id: number ): Promise<void>
  {
    await this.cinp.delete( "/api/v1/Products/ProductGroup:" + id + ":" );
  }

  _Products_ProductGroup_filter_lookup( filter: ListFilter | undefined ): [ string | undefined, Record<string, any> | undefined ]
  {
    if( filter === undefined || filter instanceof ListFilterAll )
      return [ undefined, undefined ];


    throw TypeError( 'Filter ' + filter + ' is not valid' );
  }

  async Products_ProductGroup_get_multi( { filter, position, count }: ListParamaters ): Promise<Record<string, Products_ProductGroup>>
  {
    const [ filter_name, filter_value_map ] = this._Products_ProductGroup_filter_lookup( filter );

    const response = await this.cinp.getFilteredObjects<Products_ProductGroup>( "/api/v1/Products/ProductGroup", filter_name, filter_value_map, position, count );

    for ( var key in response )
    {
      response[ key ] = new Products_ProductGroup( this, response[ key ] );
    }

    return response;
  }

  async Products_ProductGroup_list( { filter, position, count }: ListParamaters ): Promise<List>
  {
    const [ filter_name, filter_value_map ] = this._Products_ProductGroup_filter_lookup( filter );
    return await this.cinp.list( "/api/v1/Products/ProductGroup", filter_name, filter_value_map, position, count );
  }

  // Model ProductGroup (end)
  // Model Product at /api/v1/Products/Product

  async Products_Product_get( id: number ): Promise<Products_Product>
  {
    const response = await this.cinp.getOne<Products_Product>( "/api/v1/Products/Product:" + id + ":" );

    return new Products_Product( this, response );
  }

  async Products_Product_create( data: Products_Product ): Promise<void>
  {
    const response = await this.cinp.create<Products_Product>( "/api/v1/Products/Product", data._as_map( true ) );

    data._update( response.data );
  }

  async Products_Product_update( id: number, data: Products_Product ): Promise<void>
  {
    data._update( await this.cinp.updateOne<Products_Product>( "/api/v1/Products/Product:" + id + ":", data._as_map( false ) ) );
  }

  async Products_Product_delete( id: number ): Promise<void>
  {
    await this.cinp.delete( "/api/v1/Products/Product:" + id + ":" );
  }

  _Products_Product_filter_lookup( filter: ListFilter | undefined ): [ string | undefined, Record<string, any> | undefined ]
  {
    if( filter === undefined || filter instanceof ListFilterAll )
      return [ undefined, undefined ];


    throw TypeError( 'Filter ' + filter + ' is not valid' );
  }

  async Products_Product_get_multi( { filter, position, count }: ListParamaters ): Promise<Record<string, Products_Product>>
  {
    const [ filter_name, filter_value_map ] = this._Products_Product_filter_lookup( filter );

    const response = await this.cinp.getFilteredObjects<Products_Product>( "/api/v1/Products/Product", filter_name, filter_value_map, position, count );

    for ( var key in response )
    {
      response[ key ] = new Products_Product( this, response[ key ] );
    }

    return response;
  }

  async Products_Product_list( { filter, position, count }: ListParamaters ): Promise<List>
  {
    const [ filter_name, filter_value_map ] = this._Products_Product_filter_lookup( filter );
    return await this.cinp.list( "/api/v1/Products/Product", filter_name, filter_value_map, position, count );
  }

  async Products_Product_call_buy( id: number ): Promise<void>
  {
    await this.cinp.callOne( "/api/v1/Products/Product:" + id + ":(buy)", {} );
    return;
  }


  // Model Product (end)
  // Namespace Products (end)
  // Namespace  (end)
}

export default Vending;
// Model User from Auth at /api/v1/Auth/User
/*

*/
export class Auth_User
{
  private _service: Vending;



  constructor( service: Vending, source?: ModelConstructorSource<Auth_User> )
  {
    this._service = service;
    if( typeof source === 'object' )
    {
      source = source as Auth_User;
      this._update( source );
    }
  }

  _update( data: ModelUpdate<Auth_User> ): void
  {
    data = data as Auth_User;
  }

  _as_map( is_create: boolean ): Record<string, any>
  {
    if( is_create )
      return {  };

    return {  };
  }



  async _call_login(  username: string, password: string  ): Promise<string>
  {
    return this._service.Auth_User_call_login( username, password  );
  }


  async _call_logout(  ): Promise<void>
  {
    return this._service.Auth_User_call_logout( );
  }


  async _call_whoami(  ): Promise<string>
  {
    return this._service.Auth_User_call_whoami( );
  }


  async _call_changePassword(  password: string  ): Promise<void>
  {
    return this._service.Auth_User_call_changePassword( password  );
  }


}

export namespace Auth_User
{

}

// Model Customer from Customers at /api/v1/Customers/Customer
/*
Customer(id, name, updated, created)
*/
export class Customers_Customer
{
  private _service: Vending;

  public id: number = 0;

  public name: string | undefined = undefined;
  public updated: Date | undefined = undefined;
  public created: Date | undefined = undefined;

  constructor( service: Vending, source?: ModelConstructorSource<Customers_Customer> )
  {
    this._service = service;
    if( typeof source === 'object' )
    {
      source = source as Customers_Customer;
      this.id = source.id;
      this._update( source );
    }
    else if( ( typeof source === 'string' ) && source.startsWith( '/api/v1/Customers/Customer' ) )
    {
      this.id = parseInt( source.split( ':' )[ 1 ] );
    }
    else if( typeof source === 'number' )
    {
      this.id = source;
    }
  }

  toString(): string
  {
    return this.id.toString();
  }

  toURL(): string
  {
    return '/api/v1/Customers/Customer:' + this.id.toString() + ':';
  }

  _update( data: ModelUpdate<Customers_Customer> ): void
  {
    data = data as Customers_Customer;
    this.name = data.name;
    this.updated = data.updated;
    this.created = data.created;
  }

  _as_map( is_create: boolean ): Record<string, any>
  {
    if( is_create )
      return { 'name': this.name,  };

    return { 'name': this.name,  };
  }


  async _get(): Promise<void>
  {
    const record = await this._service.Customers_Customer_get( this.id );

    this._update( record );
  }

  async _create(): Promise<void>
  {
    return this._service.Customers_Customer_create( this );
  }

  async _save(): Promise<void>
  {
    return this._service.Customers_Customer_update( this.id, this );
  }

  async _delete(): Promise<void>
  {
    return this._service.Customers_Customer_delete( this.id );
  }


}

export namespace Customers_Customer
{

}

// Model ProductGroup from Products at /api/v1/Products/ProductGroup
/*
ProductGroup(id, name, updated, created)
*/
export class Products_ProductGroup
{
  private _service: Vending;

  public id: number = 0;

  public name: string | undefined = undefined;
  public updated: Date | undefined = undefined;
  public created: Date | undefined = undefined;

  constructor( service: Vending, source?: ModelConstructorSource<Products_ProductGroup> )
  {
    this._service = service;
    if( typeof source === 'object' )
    {
      source = source as Products_ProductGroup;
      this.id = source.id;
      this._update( source );
    }
    else if( ( typeof source === 'string' ) && source.startsWith( '/api/v1/Products/ProductGroup' ) )
    {
      this.id = parseInt( source.split( ':' )[ 1 ] );
    }
    else if( typeof source === 'number' )
    {
      this.id = source;
    }
  }

  toString(): string
  {
    return this.id.toString();
  }

  toURL(): string
  {
    return '/api/v1/Products/ProductGroup:' + this.id.toString() + ':';
  }

  _update( data: ModelUpdate<Products_ProductGroup> ): void
  {
    data = data as Products_ProductGroup;
    this.name = data.name;
    this.updated = data.updated;
    this.created = data.created;
  }

  _as_map( is_create: boolean ): Record<string, any>
  {
    if( is_create )
      return { 'name': this.name,  };

    return { 'name': this.name,  };
  }


  async _get(): Promise<void>
  {
    const record = await this._service.Products_ProductGroup_get( this.id );

    this._update( record );
  }

  async _create(): Promise<void>
  {
    return this._service.Products_ProductGroup_create( this );
  }

  async _save(): Promise<void>
  {
    return this._service.Products_ProductGroup_update( this.id, this );
  }

  async _delete(): Promise<void>
  {
    return this._service.Products_ProductGroup_delete( this.id );
  }


}

export namespace Products_ProductGroup
{

}

// Model Product from Products at /api/v1/Products/Product
/*
Product(id, name, cost, location, available, group, updated, created)
*/
export class Products_Product
{
  private _service: Vending;

  public id: number = 0;

  public name: string | undefined = undefined;
  public cost: number | undefined = undefined;
  public location: string | undefined = undefined;
  public available: number | undefined = undefined;
  public group: Products_ProductGroup | undefined = undefined;
  public updated: Date | undefined = undefined;
  public created: Date | undefined = undefined;

  constructor( service: Vending, source?: ModelConstructorSource<Products_Product> )
  {
    this._service = service;
    if( typeof source === 'object' )
    {
      source = source as Products_Product;
      this.id = source.id;
      this._update( source );
    }
    else if( ( typeof source === 'string' ) && source.startsWith( '/api/v1/Products/Product' ) )
    {
      this.id = parseInt( source.split( ':' )[ 1 ] );
    }
    else if( typeof source === 'number' )
    {
      this.id = source;
    }
  }

  toString(): string
  {
    return this.id.toString();
  }

  toURL(): string
  {
    return '/api/v1/Products/Product:' + this.id.toString() + ':';
  }

  _update( data: ModelUpdate<Products_Product> ): void
  {
    data = data as Products_Product;
    this.name = data.name;
    this.cost = data.cost;
    this.location = data.location;
    this.available = data.available;
    this.group = data.group !== null ? new Products_ProductGroup( this._service, data.group ) : undefined;
    this.updated = data.updated;
    this.created = data.created;
  }

  _as_map( is_create: boolean ): Record<string, any>
  {
    if( is_create )
      return { 'name': this.name, 'cost': this.cost, 'location': this.location, 'available': this.available, 'group': this.group !== undefined ? this.group.toURL() : undefined,  };

    return { 'name': this.name, 'cost': this.cost, 'location': this.location, 'available': this.available, 'group': this.group !== undefined ? this.group.toURL() : undefined,  };
  }


  async _get(): Promise<void>
  {
    const record = await this._service.Products_Product_get( this.id );

    this._update( record );
  }

  async _create(): Promise<void>
  {
    return this._service.Products_Product_create( this );
  }

  async _save(): Promise<void>
  {
    return this._service.Products_Product_update( this.id, this );
  }

  async _delete(): Promise<void>
  {
    return this._service.Products_Product_delete( this.id );
  }


  async _call_buy(  ): Promise<void>
  {
    return this._service.Products_Product_call_buy( this.id );
  }


}

export namespace Products_Product
{

}
