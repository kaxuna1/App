using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CurrencyManagement.WebApi.Models
{
    public class AllSynchronizeModel
    {
        public IEnumerable<BranchModel> Branches { get; set; }
        public IEnumerable<VillageModel> Villages { get; set; }
        public IEnumerable<ConsulModel> Consuls { get; set; }
        public IEnumerable<Region> Regions { get; set; }
        
    }

    public class VillageModel
    {
        public int Id { get; set; }
        public string Village { get; set; }
        public string City { get; set; }
        public int BranchId { get; set; }
    }
    public class ConsulModel
    {
        public int Id { get; set; }
        public string Consul { get; set; }
        public int VillageId { get; set; }
    }
    public class Region
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class BranchModel
    {
        public int Id { get; set; }
        public string Branch { get; set; }
        public string City { get; set; }
        public int Region { get; set; }
    }

    public class ReportParams
    {
        public long branch { get; set; }
        public long consul { get; set; }
        public int type { get; set; }
        public DateTime from { get; set; }
        public DateTime to { get; set; }
    }
    public class StatusChangeParams
    {
        public long id;
        public int status;
    }
    public class KomliChangeParams
    {
        public long id;
        public int komli;
        public DateTime validFrom;
    }

    public class GetVilagesParams
    {
        public long Id;
        public DateTime Date;
    }

    public class AddOfficerToVillageModel
    {
        public long OfficerId;
        public long VillageId;
        public DateTime ValidFrom;
        public int Komli;
    }

    public class GetAvailableKomliRequestModel
    {
        public long vilageId;
        public DateTime date;
    }
}