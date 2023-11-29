<p className="text-gray-500 text-sm">
  {(parseInt(event.Time.substring(0, 2), 10) +
    ((parseInt(selectedOption.replace("UTC", ""), 10) + 24) % 24)) %
    24 >
  12
    ? ((parseInt(event.Time.substring(0, 2), 10) +
        ((parseInt(selectedOption.replace("UTC", ""), 10) + 24) % 24)) %
        24) %
      12
    : (parseInt(event.Time.substring(0, 2), 10) +
        ((parseInt(selectedOption.replace("UTC", ""), 10) + 24) % 24)) %
      24}
  :{event.Time.slice(-2)}{" "}
  {parseInt(event.Time.substring(0, 2), 10) > 12 ? "PM" : "AM"}
</p>;

hour = hour + parseInt(selectedOption.replace("UTC", ""), 10);
