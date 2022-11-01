import { sendMailTest } from "../lib/mailer.js";
import { notFoundError, createError, missingData } from "../config/error.js";
import Event from "../models/event.js";

export const test = async (req, res, next) => {
  console.log("wena wena");
  sendMailTest();

  res.send("wena wena");
};

//Crear usuario
export const create = async (req, res, next) => {
  console.log("---CREATE NEW EVENT---");
  let event = new Event(req.body);
  console.log("event", event);
  event.title = event.title.toLowerCase();
  let a = req.body.scheduled.setStart;
  const time = new Date(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
  event.getTime = time.getTime();
  let query = {
    $and: [
      {
        hotel: event.hotel,
      },
      {
        service: event.service,
      },
      {
        getTime: event.getTime,
      },
    ],
  };
  console.log("la query", query)
  let exists = await Event.findOne(query,{}).exec();
  console.log("exists", exists)
  if (exists) {
    console.log("ya existe")
    res.send({event:exists, msg:"document already exists"})
  } else {
    console.log("no existe")
    try {
        const newEvent = await event.save();
        console.log("nuevo evento", newEvent);
        res.json({event:newEvent, msg:"new Document"});
      } catch (err) {
        next(err);
      }
  }


 
};
//Obtener evento por ID
export const getById= async (req, res, next) => {
    console.log('---GET EVENT BY ID---')
    Event.findOne({ _id: req.params.id })
        .exec((err, event) => {
          if (err) next(err);
          if (event) {
                event.populate(
                    [
                        {
                            path: "hotel",
                        //   select: "isActive name  email phone creator user imgUrl emails type",
                        },
                        {
                            path: "service",
                        //   select: "isActive name  email phone creator user imgUrl emails type",
                        },
                        {
                            path: "client",
                        //   select: "isActive name  email phone creator user imgUrl emails type",
                        },
    
                    ]
                )
            res.send(event)
            } else {
            console.log("se viene error")
            return next(err);
            }
        });
};
//Obtener eventos con paginate por cliente, hotel, Worker, 
export const getEvents= async (req, res, next) => {
    console.log('---GET EVENTS---')
    let body={}
    Object.assign(body, req.query);
    console.log("query", body)
    
    const populate = [
        {
          path: "hotel",
        //   select: "isActive name  email phone creator user imgUrl emails type",
        },
        {
            path: "worker",
        },
        {
            path: "client",
        },
        {
            path: "creator",
        },
      ];
    let options = {
      // populate,
      // select,
      page:body.page||1,
      limit:body.limit||50,
      sort:{ updatedAt: -1 },
    }
    let query={}
    body.isActive?query.isActive=body.isActive:""
    body.client?query.client=body.client:""
    body.hotel?query.hotel=body.hotel:""
    body.worker?query.worker=body.worker:""
    body.creator?query.creator=body.creator:""
    try{
      Event.paginate(
        query,
        options,
        (err, items) => {
          if (err) return next(err);
          res.send(items);
        }
      );
    }
    catch (err) {
      next(err);
    }
};
//Actualizar data de un evento
export const updateOne = (req, res, next) => {
    console.log('---UPDATE EVENT---')
    let data = req.body;
    Event.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      data,
      {
        new: true,
      }
    )
      .exec((err, service) => {
        if (err) return next(err);
        res.send(service);
      });
}

