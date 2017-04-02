using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebApplication7.Models;

namespace WebApplication7.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        UsersContext db;
        public UsersController(UsersContext context)
        {
            this.db = context;
        }

        [HttpGet]
        public IEnumerable<User> Get()
        {
            return db.Users.ToList();
        }

        // POST api/users
        [HttpPost]
        public IActionResult Post([FromBody]User user)
        {
            if (user == null)
            {
                ModelState.AddModelError("", "Заполните обязательные поля");
                return BadRequest(ModelState);
            }
            
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            db.Users.Add(user);
            db.SaveChanges();
            return Ok(user);
        }        
    }
}