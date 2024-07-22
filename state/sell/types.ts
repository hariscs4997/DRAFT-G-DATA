
  export type SellDataType = {
    available_data_count: Number,
    available_data_market_value: Number,
    available_data_value: Number,
    consent_name: String,
    total_data_count: Number,
    total_data_value: Number,
    used_in_deals_total_count: Number,
    used_in_deals_total_value: Number
  };
 
  export type BuyTableDataType = {
    amount: string;
    created_at: string;
    creator_id: number;
    id: number;
    personal_data_field_id: number;
    qunatity: number;
    status: string;
    updated_at: string;
}
  export type MySellType = {
    buyTableData:BuyTableDataType[];
    sellData: SellDataType;
    sellTableData:SellTableDataType[]
    buyData:BuyDataType
  };
  
  export type SellTableDataType=
    {
      name: string | undefined;
  limitPrice?: number | undefined;
  amount?: number | undefined;
  total?: number | undefined;
   }[]

   export type BuyDataType=
    {
      amount_offered: String,
      created_at: String,
      id: Number,
      interest_reason:String,
      offered_by_id: Number,
      updated_at: String,
      user_consent_deal_id: Number
  }
   
export const SellData = {
  available_data_count: 0,
  available_data_market_value:0,
  available_data_value: 0,
  consent_name: '',
  total_data_count: 0,
  total_data_value: 0,
  used_in_deals_total_count: 0,
  used_in_deals_total_value: 0
};
export const  BuyData=
{
  amount_offered: '',
  created_at: '',
  id: 0,
  interest_reason:'',
  offered_by_id: 0,
  updated_at: '',
  user_consent_deal_id:0
}