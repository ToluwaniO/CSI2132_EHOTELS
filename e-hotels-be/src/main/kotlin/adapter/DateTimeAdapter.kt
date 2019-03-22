package adapter

import com.google.gson.TypeAdapter
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonWriter
import org.joda.time.DateTime

class DateTimeAdapter(): TypeAdapter<DateTime>() {
    override fun write(out: JsonWriter?, value: DateTime?) {
        out?.value(value?.millis)
    }

    override fun read(`in`: JsonReader?): DateTime {
        return DateTime(`in`?.nextLong())
    }

}