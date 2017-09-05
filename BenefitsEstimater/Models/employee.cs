using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitsEstimater.Models
{
    public class employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double salary { get; set; }
        public virtual int PersonId { get; set; }
        public virtual List<person> Dependents { get; set; }
    }
}